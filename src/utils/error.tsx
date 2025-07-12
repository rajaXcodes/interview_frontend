// Speech constants and utilities
export const SPEECH_CONFIG = {
  SILENCE_TIMEOUT: 2000, // 2 seconds
  RESTART_DELAY: 1000, // 1 second
  LANGUAGE: "en-US",
  TTS_VOICE: "Joanna",
  TTS_ENGINE: "neural",
} as const;

export const SPEECH_ERRORS = {
  NO_SPEECH_RECOGNITION: "Speech recognition is not supported in this browser",
  PUTER_UNAVAILABLE: "Puter TTS service is not available",
  AUDIO_PLAYBACK_FAILED: "Audio playback failed",
  MICROPHONE_ACCESS_DENIED: "Microphone access denied",
  NETWORK_ERROR: "Network error occurred",
  API_ERROR: "API request failed",
} as const;

export interface SpeechError {
  code: keyof typeof SPEECH_ERRORS;
  message: string;
  details?: string;
}

export class SpeechErrorHandler {
  static createError(code: keyof typeof SPEECH_ERRORS, details?: string): SpeechError {
    return {
      code,
      message: SPEECH_ERRORS[code],
      details,
    };
  }

  static handleError(error: any): SpeechError {
    // if (error instanceof SpeechError ) {
    //   return error;
    // }

    if (error.name === "NotAllowedError") {
      return this.createError("MICROPHONE_ACCESS_DENIED", error.message);
    }

    if (error.name === "NetworkError") {
      return this.createError("NETWORK_ERROR", error.message);
    }

    return this.createError("API_ERROR", error.message || "Unknown error");
  }
}

// Check if browser supports speech recognition
export const checkBrowserSupport = (): boolean => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

// Check if Puter is available
export const checkPuterAvailability = (): boolean => {
  return typeof puter !== 'undefined' && puter?.ai?.txt2speech;
};

// Validate session ID
export const validateSessionId = (sessionId: string | null): boolean => {
  return Boolean(sessionId && sessionId.trim().length > 0);
};

// Debounce function for transcript processing
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Clean transcript text
export const cleanTranscript = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[^\w\s.,!?-]/g, '') // Remove special characters except basic punctuation
    .toLowerCase();
};

// Check if transcript is meaningful
export const isValidTranscript = (text: string): boolean => {
  const cleaned = cleanTranscript(text);
  return cleaned.length > 2 && /[a-zA-Z]/.test(cleaned);
};

// Speech recognition options
export const getSpeechRecognitionOptions = () => ({
  continuous: true,
  interimResults: false,
  language: SPEECH_CONFIG.LANGUAGE,
  maxAlternatives: 1,
});

// TTS options
export const getTTSOptions = () => ({
  voice: SPEECH_CONFIG.TTS_VOICE,
  engine: SPEECH_CONFIG.TTS_ENGINE,
  language: SPEECH_CONFIG.LANGUAGE,
});

// Log speech events for debugging
export const logSpeechEvent = (event: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Speech] ${event}:`, data);
  }
};