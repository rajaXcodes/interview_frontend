import FloatingBackground from "./FloatingBackground";
import CodeDemo from "./CodeDemo";
import { useNavigate } from "react-router-dom";
const HeroSection: React.FC = () => {
    const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <FloatingBackground />
      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Coding Interviews
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Practice with 1000+ coding problems, real interview scenarios, and
              AI-powered feedback. Land your dream job at top tech companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
                onClick={() => navigate("/pre")}
              >
                Get Started
              </button>
              <button className="px-8 py-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg font-semibold hover:transform hover:-translate-y-1 transition-all hover:shadow-lg">
                View Demo
              </button>
            </div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CodeDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
