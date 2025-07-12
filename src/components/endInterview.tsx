import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertTriangle,
  Download,
  Home,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { endInterview } from "../../api";
import { useSession } from "../contexts/SessionContext";


interface FeedbackData {
  overallScore: number;
  maxScore: number;
  performance: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  skillBreakdown: {
    [key: string]: {
      score: number;
      max: number;
    };
  };
}

const InterviewFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { sessionId } = useSession();

  if (!sessionId) {
    navigate("/");
  }
  useEffect(() => {
    document.exitFullscreen();
    const loadFeedback = async () => {
      try {
        if (sessionId) {
          const data = await endInterview(sessionId);
          setFeedback(data);
        }
      } catch (err) {
        setError("Failed to load feedback. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, []);

  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "text-emerald-400";
    if (percentage >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance.toLowerCase()) {
      case "excellent":
        return "bg-emerald-900 text-emerald-300 border-emerald-700";
      case "good":
        return "bg-blue-900 text-blue-300 border-blue-700";
      case "average":
        return "bg-amber-900 text-amber-300 border-amber-700";
      default:
        return "bg-red-900 text-red-300 border-red-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Processing Results
            </h2>
            <p className="text-gray-400 mt-1">
              Analyzing your interview performance...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <XCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-xl font-semibold text-white">
            Unable to Load Results
          </h2>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const scorePercentage = (feedback.overallScore / feedback.maxScore) * 100;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Interview Assessment
              </h1>
              <p className="text-gray-300 mt-1">
                Performance evaluation and feedback
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overall Score Section */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-white">
                    {feedback.overallScore}
                  </span>
                  <span className="text-lg text-gray-400">
                    out of {feedback.maxScore}
                  </span>
                </div>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mt-2 ${getPerformanceBadge(
                    feedback.performance
                  )}`}
                >
                  {feedback.performance}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-2">
                Overall Performance
              </div>
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${scorePercentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {Math.round(scorePercentage)}%
              </div>
            </div>
          </div>
          <p className="text-gray-300 mt-4 leading-relaxed">
            {feedback.summary}
          </p>
        </div>

        {/* Skills Breakdown */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Skills Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(feedback.skillBreakdown).map(([skill, data]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-300">
                    {skill}
                  </span>
                  <span
                    className={`text-sm font-semibold ${getScoreColor(
                      data.score,
                      data.max
                    )}`}
                  >
                    {data.score}/{data.max}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(data.score / data.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths and Areas for Improvement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Strengths */}
          <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
              Strengths
            </h3>
            <div className="space-y-3">
              {feedback.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    {strength}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
              Areas for Improvement
            </h3>
            <div className="space-y-3">
              {feedback.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    {weakness}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
            Recommendations
          </h3>
          <div className="space-y-3">
            {feedback.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-400">
                    {index + 1}
                  </span>
                </div>
                <span className="text-gray-300 text-sm leading-relaxed">
                  {suggestion}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewFeedback;
