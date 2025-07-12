import { useNavigate } from "react-router-dom";

export default function Button() {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate("/pre")
    }
  return (
    <button className="p-[3px] relative" onClick={handleClick}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-sm" />
      <div className="px-2 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
        Get Started
      </div>
    </button>
  );
}
