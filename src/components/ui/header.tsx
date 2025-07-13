import { Code } from "lucide-react";
const InterviewHeader = ({
  onEndInterview,
}: {
  onEndInterview: () => void;
}) => (
  <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        <Code className="w-5 h-5 text-white" />
      </div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AlgoMentor</h1>
    </div>
    <button
      onClick={onEndInterview}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      End Interview
    </button>
  </div>
);

export default InterviewHeader;