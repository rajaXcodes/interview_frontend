import { useEffect, useRef } from "react";
import { Mic, Volume2, Loader2, Square } from "lucide-react";
import { type Message } from "../../hooks/speechhook";

interface ChatPanelProps {
  messages: Message[];
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  currentTranscript: string;
  onStartListening: () => void;
  onStopListening: () => void;
  onAbortAll: () => void;
}

const ChatPanel = ({
  messages,
  isListening,
  isSpeaking,
  isProcessing,
  currentTranscript,
  onStartListening,
  onStopListening,
  onAbortAll,
}: ChatPanelProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getStatusText = () => {
    if (isProcessing) return "Processing...";
    if (isSpeaking) return "AI Speaking...";
    if (isListening) return "Listening...";
    return "Ready";
  };

  const getStatusColor = () => {
    if (isProcessing) return "bg-yellow-400";
    if (isSpeaking) return "bg-blue-400";
    if (isListening) return "bg-green-400";
    return "bg-gray-600";
  };

  return (
    <div className="bg-gray-800 p-4 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="text-lg font-semibold text-white">Interview Chat</h2>
        <div className="flex items-center space-x-2">
          {isProcessing && (
            <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
          )}
          {isSpeaking && (
            <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
          )}
          {isListening && (
            <Mic className="w-4 h-4 text-green-400 animate-pulse" />
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 min-h-0">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-8"
                : msg.role === "ai"
                ? "bg-gray-700 text-gray-100 mr-8"
                : "bg-gray-600 text-gray-200 mx-4"
            }`}
          >
            <div className="text-xs opacity-70 mb-1">
              {msg.role === "user"
                ? "You"
                : msg.role === "ai"
                ? "AI Interviewer"
                : "System"}
            </div>
            <div className="text-sm">{msg.content}</div>
          </div>
        ))}

        {/* Live transcript */}
        {currentTranscript && isListening && (
          <div className="bg-gray-600 text-gray-200 p-3 rounded-lg mr-8 opacity-75 border-l-2 border-green-400">
            <div className="text-xs opacity-70 mb-1">Speaking...</div>
            <div className="text-sm italic">{currentTranscript}</div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Controls */}
      <div className="border-t border-gray-700 pt-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
            <span className="text-sm text-gray-300">{getStatusText()}</span>
          </div>

          {/* Voice button */}
          <div className="flex items-center space-x-2">
            {!isListening && !isSpeaking && !isProcessing && (
              <button
                onClick={onStartListening}
                className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
                title="Start Speaking"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}

            {isListening && (
              <button
                onClick={onStopListening}
                className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                title="Stop Speaking"
              >
                <Square className="w-5 h-5" />
              </button>
            )}

            {(isSpeaking || isProcessing) && (
              <button
                onClick={onAbortAll}
                className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                title="Stop All"
              >
                <Square className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Status text */}
        <div className="text-xs text-gray-400 text-center">
          {isProcessing
            ? "Processing your response..."
            : isSpeaking
            ? "AI is speaking..."
            : isListening
            ? "Speak now, click stop when done"
            : "Click the microphone to speak"}
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
