
// import React, { useEffect, useState } from "react";

// export default function BaselinePage() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleClick = () => {
//     window.open("https://www.alancowen.com/video", "_blank");
//   };

//   if (!user) {
//     return <p style={{ textAlign: "center" }}>Loading user data...</p>;
//   }

//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       minHeight: "100vh",
//       backgroundColor: "#f5fafc",
//       fontFamily: "Arial, sans-serif",
//     }}>
//       <div style={{
//         backgroundColor: "white",
//         padding: "30px 50px",
//         borderRadius: "15px",
//         boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//         maxWidth: "600px",
//         textAlign: "center"
//       }}>
//         <h1 style={{ color: "#036666" }}>Baseline Emotion Induction</h1>
//         <p style={{ color: "#666" }}>
//           Let's establish your baseline emotional state
//         </p>

//         <div style={{
//           backgroundColor: "#f0f4f5",
//           padding: "15px 20px",
//           borderRadius: "10px",
//           margin: "20px 0",
//           textAlign: "left"
//         }}>
//           <strong>Your Target Emotion:</strong>{" "}
//           <span style={{ color: "#006d77", fontWeight: "bold" }}>
//             {user.assigned_emotion}
//           </span>
//           <p style={{ marginTop: "10px" }}>
//             In this study, you will watch movie clips and rate your emotional responses.
//             First, we'll help you induce your assigned baseline emotion by watching some videos.
//             We are redirecting you to a website – click on some of the data points for the emotion
//             we'll assign you to feel that emotion.
//           </p>
//           <p>After watching, return to this page to rate your emotional state.</p>
//         </div>

//         <button
//           onClick={handleClick}
//           style={{
//             backgroundColor: "#006d77",
//             color: "white",
//             padding: "12px 25px",
//             fontSize: "16px",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer"
//           }}
//         >
//           Open Video & Induce Emotion
//         </button>

//         <p style={{ fontSize: "13px", marginTop: "15px", color: "#555" }}>
//           The video will open in a new tab. Return here when you're done.
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BaselinePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenVideo = () => {
    window.open("https://www.alancowen.com/video", "_blank");
  };

  const handleContinue = () => {
    navigate("/rate-emotion");
  };

  if (!user) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f5fafc",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px 50px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "700px",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#036666" }}>Baseline Emotion Induction</h1>
        <p style={{ color: "#666" }}>
          Let’s establish your baseline emotional state
        </p>

        <div style={{
          backgroundColor: "#f0f4f5",
          padding: "15px 25px",
          borderRadius: "10px",
          margin: "20px 0",
          textAlign: "left"
        }}>
          <strong>Your Target Emotion:</strong>{" "}
          <span style={{ color: "#006d77", fontWeight: "bold" }}>
            {user.assigned_emotion}
          </span>
          <p style={{ marginTop: "10px" }}>
            In this study, you will watch short videos to induce your assigned baseline emotion. 
            We’ll redirect you to an external site to help you feel that emotion.
          </p>
          <p>After watching, return to this page to continue the study.</p>
        </div>

        <button
          onClick={handleOpenVideo}
          style={{
            backgroundColor: "#006d77",
            color: "white",
            padding: "12px 25px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            marginBottom: "15px"
          }}
        >
          Open Videos & Induce Emotion
        </button>

        <br />
        <button
          onClick={handleContinue}
          style={{
            backgroundColor: "#007f5f",
            color: "white",
            padding: "12px 25px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Watched the videos, Continue →
        </button>

        <p style={{ fontSize: "13px", marginTop: "15px", color: "#555" }}>
          The video site will open in a new tab. Return here when you’re done watching.
        </p>
      </div>
    </div>
  );
}
