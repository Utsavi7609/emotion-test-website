// // // // import React, { useState } from "react";
// // // // import { useNavigate } from "react-router-dom";

// // // // function FatiguePage() {
// // // //   const [fatigue1, setFatigue1] = useState("");
// // // //   const [fatigue2, setFatigue2] = useState("");
// // // //   const [fatigue3, setFatigue3] = useState("");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //   localStorage.setItem("lastPage", "/fatigue"); // ✅ Progress save
// // // //   const storedUser = localStorage.getItem("user");
// // // //     if (storedUser) {
// // // //       setUser(JSON.parse(storedUser));
// // // //     }
// // // // }, []);

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     const userId = localStorage.getItem("user_id"); // assuming you store user_id in localStorage
// // // //     if (!userId) {
// // // //       alert("No user logged in!");
// // // //       setLoading(false);
// // // //       return;
// // // //     }

// // // //     const payload = {
// // // //       user_id: userId,
// // // //       fatigue1: parseFloat(fatigue1),
// // // //       fatigue2: parseFloat(fatigue2),
// // // //       fatigue3: parseFloat(fatigue3),
// // // //     };

// // // //     try {
// // // //       const res = await fetch(`${process.env.REACT_APP_API}/save_fatigue`, {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify(payload),
// // // //       });

// // // //       if (!res.ok) throw new Error("Failed to save fatigue data");
// // // //       alert("Fatigue data saved successfully!");
// // // //       navigate("/studymain"); // or wherever the next phase is
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       alert("Error saving fatigue data.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="fatigue-container" style={{ padding: "40px", textAlign: "center" }}>
// // // //       <h2>Fatigue Survey</h2>
// // // //       <p>Please rate your fatigue levels on a scale of 1 (low) to 5 (high).</p>
// // // //       <form onSubmit={handleSubmit}>
// // // //         <div>
// // // //           <label>Fatigue Question 1: </label>
// // // //           <input
// // // //             type="number"
// // // //             min="1"
// // // //             max="5"
// // // //             value={fatigue1}
// // // //             onChange={(e) => setFatigue1(e.target.value)}
// // // //             required
// // // //           />
// // // //         </div>

// // // //         <div>
// // // //           <label>Fatigue Question 2: </label>
// // // //           <input
// // // //             type="number"
// // // //             min="1"
// // // //             max="5"
// // // //             value={fatigue2}
// // // //             onChange={(e) => setFatigue2(e.target.value)}
// // // //             required
// // // //           />
// // // //         </div>

// // // //         <div>
// // // //           <label>Fatigue Question 3: </label>
// // // //           <input
// // // //             type="number"
// // // //             min="1"
// // // //             max="5"
// // // //             value={fatigue3}
// // // //             onChange={(e) => setFatigue3(e.target.value)}
// // // //             required
// // // //           />
// // // //         </div>

// // // //         <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
// // // //           {loading ? "Saving..." : "Submit"}
// // // //         </button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default FatiguePage;

// // // import React, { useState, useEffect } from "react"; // ✅ added useEffect import
// // // import { useNavigate } from "react-router-dom";

// // // function FatiguePage() {
// // //   const [fatigue1, setFatigue1] = useState("");
// // //   const [fatigue2, setFatigue2] = useState("");
// // //   const [fatigue3, setFatigue3] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const navigate = useNavigate();

// // //   // ✅ Added user state (to replace undefined setUser)
// // //   const [user, setUser] = useState(null);

// // //   // ✅ Progress tracking logic (saves current page)
// // //   useEffect(() => {
// // //     localStorage.setItem("lastPage", "/fatigue");

// // //     const storedUser = localStorage.getItem("user");
// // //     if (storedUser) {
// // //       setUser(JSON.parse(storedUser));
// // //     }
// // //   }, []);

// // //   // ✅ Handles fatigue form submission
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     const userId = localStorage.getItem("user_id"); // stored at login
// // //     if (!userId) {
// // //       alert("No user logged in!");
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     const payload = {
// // //       user_id: userId,
// // //       fatigue1: parseFloat(fatigue1),
// // //       fatigue2: parseFloat(fatigue2),
// // //       fatigue3: parseFloat(fatigue3),
// // //     };

// // //     try {
// // //       const res = await fetch(`${process.env.REACT_APP_API}/save_fatigue`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       if (!res.ok) throw new Error("Failed to save fatigue data");
// // //       alert("✅ Fatigue data saved successfully!");
// // //       navigate("/study"); // ✅ changed to “study” (you requested default = study)
// // //     } catch (err) {
// // //       console.error("❌ Error saving fatigue data:", err);
// // //       alert("Error saving fatigue data.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div
// // //       className="fatigue-container"
// // //       style={{
// // //         padding: "40px",
// // //         textAlign: "center",
// // //         maxWidth: "600px",
// // //         margin: "auto",
// // //       }}
// // //     >
// // //       <h2>Fatigue Survey</h2>
// // //       <p>Please rate your fatigue levels on a scale of 1 (low) to 5 (high).</p>

// // //       <form onSubmit={handleSubmit}>
// // //         <div style={{ margin: "10px 0" }}>
// // //           <label>Fatigue Question 1:How physically exhausted do you feel? </label>
// // //           <input
// // //             type="number"
// // //             min="1"
// // //             max="5"
// // //             value={fatigue1}
// // //             onChange={(e) => setFatigue1(e.target.value)}
// // //             required
// // //           />
// // //         </div>

// // //         <div style={{ margin: "10px 0" }}>
// // //           <label>Fatigue Question 2:How mentally exhausted do you feel? </label>
// // //           <input
// // //             type="number"
// // //             min="1"
// // //             max="5"
// // //             value={fatigue2}
// // //             onChange={(e) => setFatigue2(e.target.value)}
// // //             required
// // //           />
// // //         </div>

// // //         <div style={{ margin: "10px 0" }}>
// // //           <label>Fatigue Question 3:How sleepy or drowsy do you feel? </label>
// // //           <input
// // //             type="number"
// // //             min="1"
// // //             max="5"
// // //             value={fatigue3}
// // //             onChange={(e) => setFatigue3(e.target.value)}
// // //             required
// // //           />
// // //         </div>

// // //         <button
// // //           type="submit"
// // //           disabled={loading}
// // //           style={{
// // //             marginTop: "20px",
// // //             padding: "8px 16px",
// // //             cursor: "pointer",
// // //           }}
// // //         >
// // //           {loading ? "Saving..." : "Submit"}
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default FatiguePage;


// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // function FatiguePage() {
// //   const [fatigue1, setFatigue1] = useState("");
// //   const [fatigue2, setFatigue2] = useState("");
// //   const [fatigue3, setFatigue3] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   // ✅ user state + load from localStorage
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     localStorage.setItem("lastPage", "/fatigue");

// //     const storedUser = localStorage.getItem("user");
// //     if (storedUser) {
// //       setUser(JSON.parse(storedUser));
// //     }
// //   }, []);

// //   // ✅ FIXED: now uses both "user_id" and "user" safely
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     // ✅ check multiple options to get user_id
// //     let userId = localStorage.getItem("user_id");
// //     if (!userId && user) userId = user.id || user.user_id; // <-- 🩵 added fallback

// //     if (!userId) {
// //       alert("No user logged in!");
// //       setLoading(false);
// //       return;
// //     }

// //     const payload = {
// //       user_id: userId,
// //       fatigue1: parseFloat(fatigue1),
// //       fatigue2: parseFloat(fatigue2),
// //       fatigue3: parseFloat(fatigue3),
// //     };

// //     try {
// //       const res = await fetch(`${process.env.REACT_APP_API}/save_fatigue`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       if (!res.ok) throw new Error("Failed to save fatigue data");
// //       alert("✅ Fatigue data saved successfully!");

// //       // ✅ progress saving + redirect to “study” page (your request)
// //       localStorage.setItem("lastPage", "/study"); // <-- 🩵 marked addition
// //       navigate("/study");
// //     } catch (err) {
// //       console.error("❌ Error saving fatigue data:", err);
// //       alert("Error saving fatigue data.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       className="fatigue-container"
// //       style={{
// //         padding: "40px",
// //         textAlign: "center",
// //         maxWidth: "600px",
// //         margin: "auto",
// //       }}
// //     >
// //       <h2>Fatigue Survey</h2>
// //       <p>Please rate your fatigue levels on a scale of 1 (low) to 5 (high).</p>

// //       <form onSubmit={handleSubmit}>
// //         <div style={{ margin: "10px 0" }}>
// //           <label>Fatigue Question 1: How physically exhausted do you feel?</label>
// //           <input
// //             type="number"
// //             min="1"
// //             max="5"
// //             value={fatigue1}
// //             onChange={(e) => setFatigue1(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div style={{ margin: "10px 0" }}>
// //           <label>Fatigue Question 2: How mentally exhausted do you feel?</label>
// //           <input
// //             type="number"
// //             min="1"
// //             max="5"
// //             value={fatigue2}
// //             onChange={(e) => setFatigue2(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div style={{ margin: "10px 0" }}>
// //           <label>Fatigue Question 3: How sleepy or drowsy do you feel?</label>
// //           <input
// //             type="number"
// //             min="1"
// //             max="5"
// //             value={fatigue3}
// //             onChange={(e) => setFatigue3(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           style={{
// //             marginTop: "20px",
// //             padding: "8px 16px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           {loading ? "Saving..." : "Submit"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default FatiguePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function FatiguePage() {
//   const [fatigue1, setFatigue1] = useState("");
//   const [fatigue2, setFatigue2] = useState("");
//   const [fatigue3, setFatigue3] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // 🟩 Load user + save progress (like RateEmotionPage)
//   useEffect(() => {
//     localStorage.setItem("lastPage", "/fatigue");
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   // 🟩 Save fatigue data to backend
//   const saveFatigueData = async () => {
//     try {
//       if (!user) {
//         console.error("❌ No logged-in user found!");
//         alert("User not found. Please log in again.");
//         return;
//       }

//       const payload = {
//         user_id: user.id,
//         fatigue1: parseFloat(fatigue1),
//         fatigue2: parseFloat(fatigue2),
//         fatigue3: parseFloat(fatigue3),
//       };

//       console.log("📤 Sending fatigue payload:", payload);

//       const res = await axios.post(
//         `${process.env.REACT_APP_API}/save_fatigue`,
//         payload
//       );

//       console.log("✅ Fatigue data saved:", res.data);
//       alert("✅ Fatigue data recorded successfully!");

//       // 🟩 Move to study page (your default)
//       window.location.href = "/study";
//     } catch (err) {
//       console.error("❌ Failed to save fatigue:", err.response?.data || err.message);
//       alert("Failed to save fatigue data. Check console for details.");
//     }
//   };

//   // 🟨 Handle submit button
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!fatigue1 || !fatigue2 || !fatigue3) {
//       alert("Please fill in all fatigue ratings before submitting.");
//       return;
//     }

//     setLoading(true);
//     await saveFatigueData();
//     setLoading(false);
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#f8fdfc",
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
//         <h2 style={{ color: "#035e5a" }}>Fatigue Survey</h2>
//         <p style={{ color: "#555" }}>
//           Please rate your fatigue levels on a scale of <b>1 (low)</b> to <b>5 (high)</b>.
//         </p>

//         <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
//           <div style={{ marginBottom: "15px" }}>
//             <label>
//               <b>1️⃣ How physically exhausted do you feel?</b>
//             </label>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={fatigue1}
//               onChange={(e) => setFatigue1(e.target.value)}
//               required
//               style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
//             />
//           </div>

//           <div style={{ marginBottom: "15px" }}>
//             <label>
//               <b>2️⃣ How mentally exhausted do you feel?</b>
//             </label>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={fatigue2}
//               onChange={(e) => setFatigue2(e.target.value)}
//               required
//               style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
//             />
//           </div>

//           <div style={{ marginBottom: "20px" }}>
//             <label>
//               <b>3️⃣ How sleepy or drowsy do you feel?</b>
//             </label>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={fatigue3}
//               onChange={(e) => setFatigue3(e.target.value)}
//               required
//               style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               backgroundColor: "#006d77",
//               color: "white",
//               padding: "10px 25px",
//               borderRadius: "8px",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             {loading ? "Saving..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// FatiguePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // 🟢 ADDED useLocation

export default function FatiguePage() {
  const [fatigue1, setFatigue1] = useState("");
  const [fatigue2, setFatigue2] = useState("");
  const [fatigue3, setFatigue3] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // 🟢 ADDED
  const nextClip = location.state?.nextClip || 0; // 🟢 ADDED

  // 🟢 Load user and preserve navigation
  useEffect(() => {
    localStorage.setItem("lastPage", "/fatigue");
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🟢 Save fatigue data to backend
  const saveFatigueData = async () => {
    try {
      if (!user) {
        console.error("❌ No logged-in user found!");
        alert("User not found. Please log in again.");
        return;
      }

      const payload = {
        user_id: user.id,
        fatigue1: parseFloat(fatigue1),
        fatigue2: parseFloat(fatigue2),
        fatigue3: parseFloat(fatigue3),
      };

      console.log("📤 Sending fatigue payload:", payload);

      const res = await axios.post(
        `${process.env.REACT_APP_API}/save_fatigue`,
        payload
      );

      console.log("✅ Fatigue data saved:", res.data);
      alert("✅ Fatigue data recorded successfully!");

      // 🟢 Return to playlist at next clip
      navigate("/playlist", { state: { userId: user.id, resumeAt: nextClip } });
    } catch (err) {
      console.error("❌ Failed to save fatigue:", err.response?.data || err.message);
      alert("Failed to save fatigue data. Check console for details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fatigue1 || !fatigue2 || !fatigue3) {
      alert("Please fill in all fatigue ratings before submitting.");
      return;
    }
    setLoading(true);
    await saveFatigueData();
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fdfc",
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
        <h2 style={{ color: "#035e5a" }}>Fatigue Survey</h2>
        <p style={{ color: "#555" }}>
          Please rate your fatigue levels on a scale of <b>1 (low)</b> to <b>5 (high)</b>.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label>
              <b>1️⃣ How physically exhausted do you feel?</b>
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={fatigue1}
              onChange={(e) => setFatigue1(e.target.value)}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>
              <b>2️⃣ How mentally exhausted do you feel?</b>
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={fatigue2}
              onChange={(e) => setFatigue2(e.target.value)}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>
              <b>3️⃣ How sleepy or drowsy do you feel?</b>
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={fatigue3}
              onChange={(e) => setFatigue3(e.target.value)}
              required
              style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#006d77",
              color: "white",
              padding: "10px 25px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
