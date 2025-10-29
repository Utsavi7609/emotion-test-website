import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GaugeChart } from "recharts"; // optional, but we'll simulate below

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || 1; // passed from previous page
  const backendUrl = "http://localhost:5000";

  const [drift, setDrift] = useState(null);

  useEffect(() => {
    fetch(`${backendUrl}/get_drift/${userId}`)
      .then((res) => res.json())
      .then((data) => setDrift(data.average_drift))
      .catch((err) => console.error("Error fetching drift:", err));
  }, [userId]);

  const chartData = [
    { name: "Drift", value: drift || 0, fill: "#6366f1" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center w-full max-w-lg animate-fade-in">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">🎯 Session Summary</h1>

        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          For each clip you watched, we measured how much your mood changed by comparing how you felt before and after the video.
          The bigger the change in how pleasant (valence) or how energetic (arousal) you felt, the higher your drift score.
          <br /><br />
          In other words, a larger drift means your emotions shifted more during that clip.
        </p>

        {drift !== null ? (
          <>
            <h2 className="text-2xl font-semibold mb-2 text-indigo-600">Your Average Drift:</h2>
            <p className="text-4xl font-bold text-indigo-800 mb-4">{drift}</p>

            {/* Simple radial bar visualization */}
            <div className="flex justify-center mb-8">
              <RadialBarChart
                width={250}
                height={250}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
                barSize={20}
                data={chartData}
                startAngle={180}
                endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, 5]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={15} />
              </RadialBarChart>
            </div>

            <p className="text-gray-500 mb-8">
              (0 = no change, 5 = very strong emotional shift)
            </p>
          </>
        ) : (
          <p>Loading your results...</p>
        )}

        <button
          onClick={() => navigate("/thankyou")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
