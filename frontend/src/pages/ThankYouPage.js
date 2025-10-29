import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">🎬 Session Complete!</h1>
        <p className="text-gray-600 mb-6 text-lg">
          Thank you for completing this session. <br />
          Your responses have been recorded successfully.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
