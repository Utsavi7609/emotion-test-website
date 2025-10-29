// import React, { useEffect, useState } from "react";
// import ValenceArousalGraph from "../components/ValenceArousalGraph"; // ✅ Added import for your hover graph component


// export default function RateEmotionPage() {
//   const [valence, setValence] = useState(3);
//   const [arousal, setArousal] = useState(3);
//   const [selectedEmotion, setSelectedEmotion] = useState("");
//   const [message, setMessage] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const handleEmotionSelect = (emotion) => {
//     setSelectedEmotion(emotion);
//     setMessage("");
//   };

//   const handleContinue = () => {
//     if (!user) return;

//     if (selectedEmotion.toLowerCase() === user.assigned_emotion.toLowerCase()) {
//       alert("✅ Emotion matched! Proceeding to the next phase of the study...");
//       // TODO: navigate to next phase (e.g., /study-phase or /main)
//     } else {
//       setMessage(
//         "Please go watch a few more videos on the previous site until you feel the assigned emotion."
//       );
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#f5fafc",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "white",
//           padding: "40px",
//           borderRadius: "15px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           maxWidth: "700px",
//           textAlign: "center",
//         }}
//       >
//         <h2 style={{ color: "#036666" }}>Rate Your Baseline Emotional State</h2>
//         <p style={{ color: "#555" }}>
//           Select emotions you're experiencing after watching the videos:
//         </p>
//         <div className="bg-[#f7fafa] border border-gray-200 rounded-lg mt-6 p-4 text-gray-700 text-sm">
//           <p className="mb-3">
//             <b>Valence (Horizontal Axis)</b>
//             <br />
//             Ranges from Negative (left, 0) to Positive (right, 5). Describes how
//             pleasant or unpleasant you feel. Left side represents negative
//             emotions like sadness or anger, while the right side represents
//             positive emotions like happiness or joy.
//           </p>
//           <p>
//             <b>Arousal (Vertical Axis)</b>
//             <br />
//             Ranges from Calm (bottom, 0) to Excited (top, 5). Describes your
//             level of activation or energy. Bottom represents low energy states
//             like calmness or tiredness, while the top represents high energy
//             states like excitement or anxiety.
//           </p>
//         </div>

        
//         {/* ✅ Replaced the placeholder with the actual hoverable Valence–Arousal Graph */}
//         <div style={{ margin: "25px 0" }}>
//           <ValenceArousalGraph
//             valence={valence}
//             arousal={arousal}
//             onValenceChange={setValence}
//             onArousalChange={setArousal}
//           />
//         </div>
//         {/* ✅ Added live coordinates display below the graph */}
//         <p style={{ marginTop: "10px", color: "#333" }}>
//           <strong>Current Position:</strong> Valence {valence}, Arousal {arousal}
//         </p>
//         {/* ✅ End of graph replacement */}

//         <div style={{ marginTop: "20px" }}>
//           <p><strong>After watching the videos, how do you feel now? You need to select{" "}
//           <b>{user?.assigned_emotion}</b> to continue the study.
//           If you still are not able to fell the assigned emotions then you can watch a few more clips from that website.</strong></p>
//           {["Happy", "Sad", "Angry", "Fearful", "Calm", "Excited", "Neutral"].map(
//             (emotion) => (
//               <button
//                 key={emotion}
//                 onClick={() => handleEmotionSelect(emotion)}
//                 style={{
//                   margin: "6px",
//                   padding: "10px 18px",
//                   borderRadius: "8px",
//                   border:
//                     selectedEmotion === emotion
//                       ? "2px solid #006d77"
//                       : "1px solid #ccc",
//                   backgroundColor:
//                     selectedEmotion === emotion ? "#cce3e2" : "white",
//                   cursor: "pointer",
//                 }}
//               >
//                 {emotion}
//               </button>
//             )
//           )}
//         </div>

//         {message && (
//           <p style={{ color: "red", marginTop: "15px" }}>
//             ⚠️ {message}
//           </p>
//         )}

//         <button
//           onClick={handleContinue}
//           style={{
//             marginTop: "25px",
//             backgroundColor: "#006d77",
//             color: "white",
//             padding: "12px 25px",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import ValenceArousalGraph from "../components/ValenceArousalGraph"; // ✅ your hover graph

export default function RateEmotionPage() {
  const [valence, setValence] = useState(3);
  const [arousal, setArousal] = useState(3);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setMessage("");
  };

//   // 🟨 START: Save baseline emotion data to backend 🟨
//   const saveBaselineEmotion = async () => {
//     try {
//       if (!user) {
//         console.error("No logged-in user found!");
//         return;
//       }

//       const payload = {
//         user_id: user.id,
//         clip_title: null, // baseline → no clip
//         induced_emotion: selectedEmotion,
//         induced_valence: valence,
//         induced_arousal: arousal,
//         is_baseline: true,
//       };

//       console.log("📤 Sending baseline payload:", payload);

//     //   const res = await axios.post(
//     //     `${import.meta.env.VITE_API_URL}/save_emotion_response`,
//     //     payload
//     //   );
//       // ✅ Use CRA environment variable instead of Vite-style
//       const res = await axios.post(`${process.env.REACT_APP_API}/save_emotion_response`, payload);

//       console.log("✅ Baseline emotion saved:", res.data);
//       alert("Baseline emotional state recorded successfully!");
//     } catch (err) {
//       console.error("❌ Failed to save emotion:", err);
//       alert("Failed to save emotion data. Check console for details.");
//     }
//   };
//   // 🟨 END: Save baseline emotion data to backend 🟨
// 🟩 Save baseline emotion data to backend
const saveBaselineEmotion = async () => {
  try {
    if (!user) {
      console.error("❌ No logged-in user found!");
      alert("User not found. Please log in again.");
      return;
    }

    const payload = {
      user_id: user.id,
      clip_title: null, // ✅ Baseline → no clip associated
      induced_emotion: selectedEmotion,
      induced_valence: valence,
      induced_arousal: arousal,
      is_baseline: true,
    };

    console.log("📤 Sending baseline payload:", payload);

    const res = await axios.post(
      `${process.env.REACT_APP_API}/save_emotion_response`,
      payload
    );

    console.log("✅ Baseline emotion saved:", res.data);
    alert("✅ Baseline emotional state recorded successfully!");
  } catch (err) {
    console.error("❌ Failed to save emotion:", err.response?.data || err.message);
    alert("Failed to save emotion data. Check console for details.");
  }
};


  // 🟨 START: Modified handleContinue 🟨
  const handleContinue = async () => {
    if (!user) {
      alert("User not found! Please log in again.");
      return;
    }

    if (!selectedEmotion) {
      alert("Please select an emotion before continuing.");
      return;
    }

    if (selectedEmotion.toLowerCase() === user.assigned_emotion.toLowerCase()) {
      // Save baseline response to DB before continuing
      await saveBaselineEmotion();

      alert("✅ Emotion matched! Proceeding to the next phase of the study...");
      // TODO: navigate to next page (e.g., /study-phase or /main)
      window.location.href = "/fatigue"; // adjust as per your route
    } else {
      setMessage(
        "⚠️ Please go watch a few more videos on the previous site until you feel the assigned emotion."
      );
    }
  };
  // 🟨 END: Modified handleContinue 🟨

  return (
    <div
      style={{
        backgroundColor: "#f5fafc",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "700px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#036666" }}>Rate Your Baseline Emotional State</h2>
        <p style={{ color: "#555" }}>
          Select emotions you're experiencing after watching the videos:
        </p>

        <div className="bg-[#f7fafa] border border-gray-200 rounded-lg mt-6 p-4 text-gray-700 text-sm">
          <p className="mb-3">
            <b>Valence (Horizontal Axis)</b>
            <br />
            Ranges from Negative (left, 0) to Positive (right, 5). Describes how
            pleasant or unpleasant you feel. Left side represents negative
            emotions like sadness or anger, while the right side represents
            positive emotions like happiness or joy.
          </p>
          <p>
            <b>Arousal (Vertical Axis)</b>
            <br />
            Ranges from Calm (bottom, 0) to Excited (top, 5). Describes your
            level of activation or energy. Bottom represents low energy states
            like calmness or tiredness, while the top represents high energy
            states like excitement or anxiety.
          </p>
        </div>

        {/* ✅ Hoverable Valence–Arousal Graph */}
        <div style={{ margin: "25px 0" }}>
          <ValenceArousalGraph
            valence={valence}
            arousal={arousal}
            onValenceChange={setValence}
            onArousalChange={setArousal}
          />
        </div>

        <p style={{ marginTop: "10px", color: "#333" }}>
          <strong>Current Position:</strong> Valence {valence}, Arousal {arousal}
        </p>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>
              After watching the videos, how do you feel now? You need to select{" "}
              <b>{user?.assigned_emotion}</b> to continue the study.
              If you still are not able to feel the assigned emotion then you can
              watch a few more clips from that website.
            </strong>
          </p>

          {["Happy", "Sad", "Angry", "Fearful", "Calm", "Excited", "Neutral"].map(
            (emotion) => (
              <button
                key={emotion}
                onClick={() => handleEmotionSelect(emotion)}
                style={{
                  margin: "6px",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border:
                    selectedEmotion === emotion
                      ? "2px solid #006d77"
                      : "1px solid #ccc",
                  backgroundColor:
                    selectedEmotion === emotion ? "#cce3e2" : "white",
                  cursor: "pointer",
                }}
              >
                {emotion}
              </button>
            )
          )}
        </div>

        {message && (
          <p style={{ color: "red", marginTop: "15px" }}>{message}</p>
        )}

        <button
          onClick={handleContinue}
          style={{
            marginTop: "25px",
            backgroundColor: "#006d77",
            color: "white",
            padding: "12px 25px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
