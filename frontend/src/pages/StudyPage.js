// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const StudyPage = () => {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     baselineEmotion: ""
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     // You can fetch logged-in user info from localStorage or Supabase
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUserData({
//         username: storedUser.username || "",
//         email: storedUser.email || "",
//         baselineEmotion: storedUser.baselineEmotion || ""
//       });
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleStart = () => {
//     navigate("/baseline");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
//         <h1 className="text-3xl font-bold text-teal-700 mb-2">
//           Welcome, {userData.username || "Participant"}!
//         </h1>
//         <p className="text-gray-700 mb-6">
//           Ready to participate in the emotion study?
//         </p>

//         <div className="text-left mb-6">
//           <h2 className="font-semibold text-lg mb-3">Study Information</h2>
//           <p><strong>Email:</strong> {userData.email}</p>
//           <p><strong>Assigned Baseline Emotion:</strong> {userData.baselineEmotion}</p>
//           <p><strong>Study Duration:</strong> Approximately 20–30 minutes</p>
//         </div>

//         <div className="bg-blue-50 text-blue-800 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
//           <strong>Note:</strong> You will watch 24 short video clips and rate your emotional responses. Please ensure you have a quiet environment and about 30 minutes available.
//         </div>

//         <button
//           onClick={handleStart}
//           className="bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-lg font-semibold shadow-md transition"
//         >
//           Start Study
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudyPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudyPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading your study details...
      </p>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px 50px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "650px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#036666", fontSize: "28px" }}>
          Welcome, {user.name || ""}
        </h1>
        <p style={{ color: "#555", marginBottom: "25px" }}>
          Ready to participate in the emotion study?
        </p>

        <div
          style={{
            textAlign: "left",
            backgroundColor: "#f0f4f5",
            borderRadius: "10px",
            padding: "20px 25px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#023e8a" }}>
            Study Information
          </h3>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* <p>
            <strong>Assigned Baseline Emotion:</strong>{" "}
            <span style={{ color: "#006d77", fontWeight: "bold" }}>
              {user.assigned_emotion}
            </span>
          </p> */}
          <p>
            <strong>Study Duration:</strong>{" "}
            <span style={{ fontWeight: "bold" }}>Approximately 20–30 minutes</span>
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#e9f4ff",
            border: "1px solid #cce1f7",
            padding: "10px 15px",
            borderRadius: "8px",
            marginBottom: "25px",
            fontSize: "14px",
          }}
        >
          <strong>Note:</strong> You will watch 24 short video clips and rate your
          emotional responses. Please ensure you have a quiet environment and
          about 30 minutes available.
        </div>

        <button
          onClick={() => navigate("/baseline")}
          style={{
            backgroundColor: "#006d77",
            color: "white",
            padding: "12px 25px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Start Study
        </button>
      </div>
    </div>
  );
}
