import { useNavigate } from "react-router-dom";

  const CTASection: React.FC = () =>{
    const navigate = useNavigate();
    return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
        <p className="text-xl mb-8 opacity-90">Join thousands of developers who've successfully cracked their coding interviews.</p>
        <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg" onClick={()=>navigate("/pre")}>
          Start Now
        </button>
      </div>
    </section>
  );
}
  export default CTASection;