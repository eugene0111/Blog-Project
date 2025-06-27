import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to Blog App
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Your thoughts, stories, and ideas deserve a place. Start writing and sharing today.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-slate-700 text-white text-lg rounded-lg hover:bg-slate-800 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-3 bg-gray-200 text-gray-800 text-lg rounded-lg hover:bg-gray-300 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};