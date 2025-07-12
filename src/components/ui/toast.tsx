import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "warning" | "error" | "success";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    warning: "bg-yellow-600 border-yellow-500",
    error: "bg-red-600 border-red-500",
    success: "bg-green-600 border-green-500",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${colors[type]} text-white shadow-lg`}
    >
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;