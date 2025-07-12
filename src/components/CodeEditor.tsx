import React, { useRef, useEffect, useState } from "react";
import { askModel } from "../../api";
declare global {
  interface Window {
    require: any;
    monaco: any;
  }
}

interface MonacoEditorProps {
  value?: string;
  language?: string;
  height?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
  sessionId?: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value = "// Welcome to the secure code editor\n// Copy, cut, and paste operations are disabled\n\nint main() {\n  \n   //your code goes here...\n\n  return 0;\n}\n\n",
  language = "cpp",
  onChange,
  readOnly = false,
  className = "",
  sessionId,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showBlockedMessage = (message: string) => {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.className =
      "fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg text-sm z-50 shadow-lg";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  const handleSubmit = async () => {
    if (!editor || !sessionId) return;

    setIsSubmitting(true);
    const code = editor.getValue();

    try {
      const result = await askModel(sessionId, "", code);

      console.log("Code submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting code:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const loadMonaco = async () => {
      // Check if Monaco is already loaded
      if (window.monaco) {
        createEditor();
        return;
      }

      // Load Monaco Editor
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js";

      script.onload = () => {
        window.require.config({
          paths: {
            vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs",
          },
        });

        window.require(["vs/editor/editor.main"], (monaco: any) => {
          window.monaco = monaco;
          createEditor();
        });
      };

      document.head.appendChild(script);
    };

    const createEditor = () => {
      if (!editorRef.current || !window.monaco) return;

      const editorInstance = window.monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: "vs-dark",
        readOnly,
        automaticLayout: true,
        fontSize: 14,
        lineNumbers: "on",
        minimap: { enabled: true },
        padding: { top: 16, bottom: 16 },
        bracketPairColorization: { enabled: true },
        guides: { bracketPairs: true, indentation: true },
        scrollBeyondLastLine: false,
        wordWrap: "on",
      });

      // Disable copy, cut, paste
      const { KeyMod, KeyCode } = window.monaco;

      editorInstance.addCommand(KeyMod.CtrlCmd | KeyCode.KeyC, () => {
        showBlockedMessage("Copy operation is disabled");
      });

      editorInstance.addCommand(KeyMod.CtrlCmd | KeyCode.KeyX, () => {
        showBlockedMessage("Cut operation is disabled");
      });

      editorInstance.addCommand(KeyMod.CtrlCmd | KeyCode.KeyV, () => {
        showBlockedMessage("Paste operation is disabled");
      });

      // Block context menu
      editorInstance.onContextMenu((e: any) => {
        e.event.preventDefault();
        showBlockedMessage("Context menu is disabled");
      });

      // Handle content changes
      editorInstance.onDidChangeModelContent(() => {
        const currentValue = editorInstance.getValue();
        if (onChange) {
          onChange(currentValue);
        }
      });

      setEditor(editorInstance);
      setIsLoading(false);
    };

    loadMonaco();

    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  }, []);

  return (
    <div
      className={`w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-xl ${className} flex flex-col`}
    >
      {/* Header - Fixed height */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm font-medium">
              Secure Editor
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-orange-400 text-xs">Protected Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Container - Takes remaining space */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
            <div className="text-gray-400 text-sm">Loading editor...</div>
          </div>
        )}

        <div ref={editorRef} className="w-full h-full" />

        {/* Security indicator */}
        {!isLoading && (
          <div className="absolute top-4 right-4 bg-red-900/20 border border-red-700/50 rounded-lg px-3 py-1 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-xs font-medium">
                Copy/Paste Disabled
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button - Fixed at bottom */}
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700 flex-shrink-0">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !sessionId}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          {isSubmitting ? "Submitting..." : "Submit Code"}
        </button>
      </div>
    </div>
  );
};

export default MonacoEditor;
