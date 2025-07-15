 interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
 const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-6 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );

  const FeaturesSection: React.FC = () => (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Why Choose AlgoMentor?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            title="Real Interview Experience"
            description="Practice with problems from actual interviews at Google, Meta, Amazon, and more."
          />
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
            title="AI-Powered Feedback"
            description="Get instant feedback on your code quality, time complexity, and optimization tips."
          />
          <FeatureCard 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/></svg>}
            title="Live Mock Interviews"
            description="Real-life interview simulation with a powerful in-browser code editor."
          />
        </div>
      </div>
    </section>
  );

  export default FeaturesSection;