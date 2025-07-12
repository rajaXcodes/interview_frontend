import { useState,useEffect } from "react";
const useProctoring = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "warning" | "error" | "success";
  } | null>(null);

  useEffect(() => {
    // Tab switch detection
    const handleTabChange = () => {
      if (document.hidden) {
        setToast({
          message:
            "Please stay on the interview page. Tab switching is not allowed.",
          type: "warning",
        });
      }
    };

    // Fullscreen detection
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setToast({
          message: "Please remain in fullscreen mode during the interview.",
          type: "error",
        });
        document.documentElement.requestFullscreen().catch(console.error);
      }
    };

    document.addEventListener("visibilitychange", handleTabChange);
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    // Enter fullscreen on mount
    document.documentElement.requestFullscreen().catch(console.error);

    return () => {
      document.removeEventListener("visibilitychange", handleTabChange);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return { toast, setToast };
};

export default useProctoring;