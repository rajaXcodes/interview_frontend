import { Camera } from "lucide-react";
const VideoFeed = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => (
  <div className="bg-gray-800 p-4">
    <h3 className="text-lg font-semibold text-white mb-3">Camera Feed</h3>
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-48 object-cover"
        autoPlay
        muted
      />
    </div>
    <div className="mt-3 flex items-center space-x-2 text-sm text-gray-400">
      <Camera className="w-4 h-4" />
      <span>Camera Active</span>
    </div>
  </div>
);

export default VideoFeed;