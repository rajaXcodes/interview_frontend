import { useState, useEffect, useCallback } from "react";
import { endInterview } from "../../api";
import Toast from "./ui/toast";
import ChatPanel from "./ui/chatPanel";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import MonacoEditor from "./CodeEditor";
import { useSpeech, type Message } from "../hooks/speechhook";
import InterviewHeader from "./ui/header";
import VideoFeed from "./ui/videoFeed";
import useProctoring from "../hooks/proctoringhooks";
import useCamera from "../hooks/camera";

export default function InterviewRoom() {
  const { sessionId } = useSession();
  const navigate = useNavigate();
  const { toast, setToast } = useProctoring();
  const { videoRef } = useCamera();

  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "Starting interview...", timestamp: Date.now() },
  ]);

  // Handle new messages
  const handleMessageAdd = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Speech hook
  const {
    isListening,
    isSpeaking,
    isProcessing,
    currentTranscript,
    startListening,
    stopListening,
    abortAll,
    initializeConversation,
    browserSupportsSpeechRecognition,
  } = useSpeech({
    sessionId: sessionId || "",
    onMessageAdd: handleMessageAdd,
  });

  // Initialize conversation once when component mounts and sessionId is available
  useEffect(() => {
    if (sessionId) {
      initializeConversation();
    }
  }, [sessionId]); // Removed initializeConversation from dependency array

  // End interview
  const handleEndInterview = useCallback(async () => {
    abortAll();
    await endInterview(sessionId!);
    navigate("/feedback");
  }, [sessionId, abortAll, navigate]);

  if (!sessionId) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center text-white">
        <h1>No Session ID</h1>
      </div>
    );
  }

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center text-white">
        <h1>Speech recognition not supported</h1>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header - fixed height */}
      <div className="flex-shrink-0">
        <InterviewHeader onEndInterview={handleEndInterview} />
      </div>

      {/* Main content area - takes remaining space */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-1 overflow-hidden">
        {/* Left column - Chat and Video */}
        <div className="lg:col-span-1 flex flex-col space-y-1 overflow-hidden">
          {/* Chat Panel - takes most of the space */}
          <div className="flex-1 overflow-hidden">
            <ChatPanel
              messages={messages}
              isListening={isListening}
              isSpeaking={isSpeaking}
              isProcessing={isProcessing}
              currentTranscript={currentTranscript}
              onStartListening={startListening}
              onStopListening={stopListening}
              onAbortAll={abortAll}
            />
          </div>

          {/* Video Feed - fixed height */}
          <div className="h-64 flex-shrink-0">
            <VideoFeed videoRef={videoRef} />
          </div>
        </div>

        {/* Right column - Code Editor */}
        <div className="lg:col-span-2 overflow-hidden">
          <MonacoEditor sessionId={sessionId} />
        </div>
      </div>

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
