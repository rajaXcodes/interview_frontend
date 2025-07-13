import { useState, useEffect, useRef, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { askModel } from "../../api";

export interface Message {
  role: "user" | "ai" | "system";
  content: string;
  timestamp: number;
}

interface UseSpeechProps {
  sessionId: string;
  onMessageAdd?: (message: Message) => void;
}

export const useSpeech = ({ sessionId, onMessageAdd }: UseSpeechProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastProcessedRef = useRef<string>("");
  const hasInitializedRef = useRef(false);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Add message helper
  const addMessage = useCallback((role: Message["role"], content: string) => {
    const message: Message = { role, content, timestamp: Date.now() };
    onMessageAdd?.(message);
  }, [onMessageAdd]);

  // Text-to-speech
  const speak = useCallback(async (text: string): Promise<void> => {
    if (!text.trim()) return;

    return new Promise((resolve) => {
      setIsSpeaking(true);
      
      puter.ai.txt2speech(text, {
        voice: "Joanna",
        engine: "neural",
        language: "en-US",
      }).then((audio: HTMLAudioElement) => {
        currentAudioRef.current = audio;
        
        audio.onended = () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
          resolve();
        };
        
        audio.play();
      }).catch(() => {
        setIsSpeaking(false);
        resolve();
      });
    });
  }, []);

  // Process user speech
  const processUserSpeech = useCallback(async (userText: string) => {
    if (!userText.trim() || userText === lastProcessedRef.current) return;

    lastProcessedRef.current = userText;
    setIsProcessing(true);

    try {
      addMessage("user", userText);
      const aiResponse = await askModel(sessionId, userText, "");
      
      if (aiResponse) {
        addMessage("ai", aiResponse);
        await speak(aiResponse);
      }
    } catch (error) {
      console.error("Speech processing error:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [sessionId, addMessage, speak]);

  // Start listening (button trigger)
  const startListening = useCallback(() => {
    if (isSpeaking || isProcessing) return;

    setIsListening(true);
    resetTranscript();
    lastProcessedRef.current = "";
    
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  }, [isSpeaking, isProcessing, resetTranscript]);

  // Stop listening
  const stopListening = useCallback(() => {
    setIsListening(false);
    
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    SpeechRecognition.stopListening();
  }, []);

  // Stop everything
  const abortAll = useCallback(() => {
    stopListening();
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setIsSpeaking(false);
    setIsProcessing(false);
  }, [stopListening]);

  // Initialize conversation - memoized to prevent recreating on every render
  const initializeConversation = useCallback(async () => {
    // Prevent double initialization
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    try {
      const response = await askModel(sessionId, "Can we start the interview?","");
      if (response) {
        addMessage("ai", response);
        await speak(response);
      }
    } catch (error) {
      console.error("Initialization error:", error);
      // Reset flag on error so it can be retried
      hasInitializedRef.current = false;
    }
  }, [sessionId, addMessage, speak]);

  // Handle transcript with silence detection
  useEffect(() => {
    if (!transcript || !isListening) return;

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }

    silenceTimerRef.current = setTimeout(() => {
      if (transcript.trim() && isListening) {
        stopListening();
        processUserSpeech(transcript);
      }
    }, 2000);

    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, [transcript, isListening, processUserSpeech, stopListening]);

  // Cleanup
  useEffect(() => {
    return () => abortAll();
  }, [abortAll]);

  return {
    isListening,
    isSpeaking,
    isProcessing,
    currentTranscript: transcript,
    startListening,
    stopListening,
    abortAll,
    initializeConversation,
    speak,
    browserSupportsSpeechRecognition,
  };
};