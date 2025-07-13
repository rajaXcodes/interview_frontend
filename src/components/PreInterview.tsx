import React, { useState } from "react";
import {
  Camera,
  Mic,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
} from "lucide-react";
import { startInterview } from "../../api";
import { useAuth } from "../contexts/AuthContext";
import { useSession } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";



const ProctoringAndRules: React.FC = () => {
  const navigate = useNavigate();

  // States to track the rules acceptance, camera/mic access, and if interview started
  const [isRulesAccepted, setIsRulesAccepted] = useState<boolean>(false);
  const [isCameraAccessGranted, setIsCameraAccessGranted] =
    useState<boolean>(false);
  const [isMicAccessGranted, setIsMicAccessGranted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { token } = useAuth();
  const { setSessionId } = useSession();

  // Rules array with icons
  const rules = [
    {
      icon: <Camera className="w-5 h-5" />,
      text: "You must allow access to your camera and microphone.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Your environment must be quiet and well-lit.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "Make sure your face is visible during the interview.",
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      text: "No distractions or other people should be in the frame.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "You cannot use any external help during the interview.",
    },
    {
      icon: <Camera className="w-5 h-5" />,
      text: "You must keep your camera on at all times.",
    },
    {
      icon: <Mic className="w-5 h-5" />,
      text: "Audio must be clear for the interview.",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "The interview will last approximately 15 minutes.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "You will be asked to solve coding problems.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Be honest and try to solve the problems to the best of your ability.",
    },
  ];

  // Request camera and mic access
  const requestMediaAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      // Check if both camera and mic are working
      if (videoTracks.length > 0 && audioTracks.length > 0) {
        setIsCameraAccessGranted(true);
        setIsMicAccessGranted(true);
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
      alert("Unable to access camera or microphone. Please try again.");
    }
  };

  // Handle start interview
  const handleStartInterview = async () => {
    if (isCameraAccessGranted && isMicAccessGranted && isRulesAccepted) {
      if (token) {
        setIsLoading(true);
        try {
          const newSessionId = await startInterview(token);
          setSessionId(newSessionId);
          navigate("/interview");
        } catch (error) {
          alert("Cannot Start Session");
        } finally {
          setIsLoading(false);
        }
      } else {
        navigate("/login");
      }
    } else {
      alert("Please accept the rules and grant camera/microphone access.");
    }
  };

  const isReadyToStart =
    isRulesAccepted && isCameraAccessGranted && isMicAccessGranted;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Interview Setup
          </h1>
          <p className="text-xl text-gray-300">
            Please complete the setup process before starting your interview
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Rules Section */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold">1</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Interview Rules</h2>
            </div>

            <div className="space-y-4 mb-6">
              {rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-750 hover:bg-gray-700 transition-colors border border-gray-600"
                >
                  <div className="text-blue-400 mt-0.5 flex-shrink-0">
                    {rule.icon}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{rule.text}</p>
                </div>
              ))}
            </div>

            {/* Rules Acceptance */}
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-600">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 bg-gray-700 border-2 border-gray-500 rounded focus:ring-blue-500 focus:ring-2 mr-3"
                  onChange={(e) => setIsRulesAccepted(e.target.checked)}
                />
                <span className="text-white font-medium">
                  I have read and accept all the terms and conditions
                </span>
              </label>
            </div>
          </div>

          {/* Setup Section */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold">2</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Device Setup</h2>
            </div>

            {/* Camera & Mic Access */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg border border-gray-600">
                <div className="flex items-center space-x-3">
                  <Camera className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-white">Camera Access</span>
                </div>
                <div className="flex items-center">
                  {isCameraAccessGranted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg border border-gray-600">
                <div className="flex items-center space-x-3">
                  <Mic className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-white">
                    Microphone Access
                  </span>
                </div>
                <div className="flex items-center">
                  {isMicAccessGranted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Grant Access Button */}
            <button
              onClick={requestMediaAccess}
              disabled={isCameraAccessGranted && isMicAccessGranted}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 mb-6 ${
                isCameraAccessGranted && isMicAccessGranted
                  ? "bg-green-600 text-white cursor-default shadow-lg"
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105"
              }`}
            >
              {isCameraAccessGranted && isMicAccessGranted ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Access Granted</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Grant Camera & Mic Access</span>
                </div>
              )}
            </button>

            {/* Start Interview Button */}
            <button
              onClick={handleStartInterview}
              disabled={!isReadyToStart || isLoading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                isReadyToStart && !isLoading
                  ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-xl transform hover:scale-105"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Starting Interview...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Interview</span>
                </div>
              )}
            </button>

            {/* Progress Indicator */}
            <div className="mt-6 flex items-center justify-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isRulesAccepted ? "bg-green-500" : "bg-gray-600"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  isCameraAccessGranted && isMicAccessGranted
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  isReadyToStart ? "bg-green-500" : "bg-gray-600"
                }`}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-2">
              {isReadyToStart
                ? "Ready to start!"
                : "Complete all steps to proceed"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProctoringAndRules;
