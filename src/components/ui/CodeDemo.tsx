  const CodeDemo: React.FC = () => (
    <div className="relative">
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-400 ml-4">two-sum.py</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
          <div className="text-purple-400">def <span className="text-blue-400">twoSum</span><span className="text-gray-300">(nums, target):</span></div>
          <div className="text-gray-500 mt-2">    # Your solution here</div>
          <div className="text-yellow-400 mt-2">    for <span className="text-gray-300">i in range(len(nums)):</span></div>
          <div className="text-yellow-400 mt-2 ml-4">        for <span className="text-gray-300">j in range(i+1, len(nums)):</span></div>
          <div className="text-yellow-400 mt-2 ml-8">            if <span className="text-gray-300">nums[i] + nums[j] == target:</span></div>
          <div className="text-yellow-400 mt-2 ml-12">                return <span className="text-gray-300">[i, j]</span></div>
        </div>
      </div>
    </div>
  );

  export default CodeDemo;