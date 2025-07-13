import { useEffect, useState, useRef } from "react";

const StatsSection: React.FC = () => {
  const stats = [
    { number: 1000, label: "Coding Interviews" },
    { number: 50000, label: "Users" },
    { number: 200, label: "Companies" },
    { number: 95, label: "Success Rate" },
  ];

  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const animateCount = (target: number, index: number) => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < target) {
        count += Math.ceil(target / 100);
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          newCounts[index] = Math.min(count, target);
          return newCounts;
        });
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  useEffect(() => {
    // Only create observer if animation hasn't happened yet
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          stats.forEach((stat, index) => animateCount(stat.number, index));
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.label === "Success Rate"
                  ? `${counts[index].toLocaleString()}%`
                  : `${counts[index].toLocaleString()}+`}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
