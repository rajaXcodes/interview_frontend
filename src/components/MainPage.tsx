import Navigation from "./ui/NavBar";
import HeroSection from "./ui/HeroSection";
import StatsSection from "./ui/StatSection";
import FeaturesSection from "./ui/FeatureCardSection";
import CTASection from "./ui/CtaSection";
const MainPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default MainPage;
