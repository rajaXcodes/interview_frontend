import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "./github";
const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md bg-white/5 border-b border-white/10 transition-all duration-300 px-10 ${
        isScrolled ? "bg-gray-900/80" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AlgoMentor
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Practice
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Contests
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Learn
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Community
            </a>
          </div>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-500 transition-colors"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/login")}
            >
              Sign Up
            </button>
            <button>
              <a
                href="https://github.com/rajaXcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 hover:opacity-80 transition-opacity"
              >
                <GitHubIcon/>
                GitHub
              </a>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
