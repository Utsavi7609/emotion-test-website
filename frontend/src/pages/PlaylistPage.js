// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import MessageBox from "../components/MessageBox";
// import ProgressBar from "../components/ProgressBar";

// const PlaylistPage = ({ userId }) => {
//   const [clips, setClips] = useState([]);
//   const [currentClip, setCurrentClip] = useState(0);
//   const [valence, setValence] = useState(3);
//   const [arousal, setArousal] = useState(3);
//   const [status, setStatus] = useState("");
//   const navigate = useNavigate();

//   const backendUrl = "http://localhost:5000";
// <ProgressBar current={currentClip + 1} total={clips.length} />

//   useEffect(() => {
//     const fetchPlaylist = async () => {
//       try {
//         const res = await fetch(`${backendUrl}/playlist/${userId}`);
//         const data = await res.json();
//         setClips(data.clips);
//       } catch (err) {
//         console.error("Error fetching playlist:", err);
//       }
//     };
//     fetchPlaylist();
//   }, [userId]);

//   const handleSubmitRating = async () => {
//     const clip = clips[currentClip];
//     await fetch(`${backendUrl}/save_emotion`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         user_id: userId,
//         clip_title: clip.title,
//         induced_valence: valence,
//         induced_arousal: arousal,
//       }),
//     });

//     if (currentClip === 7 || currentClip === 15) {
//       navigate("/fatigue", { state: { userId, nextClip: currentClip + 1 } });
//     } else if (currentClip < clips.length - 1) {
//       setCurrentClip(currentClip + 1);
//     } else {
//       setStatus("✅ Experiment complete!");
//     }
//   };

//   if (!clips.length) return <MessageBox message="Loading playlist..." />;

//   const clip = clips[currentClip];
//   return (
//     <div className="page">
//       <h2>{clip.title}</h2>
//       <video
//         src={clip.file_url}
//         width="640"
//         height="360"
//         controls
//         onEnded={() => setStatus("Rate your emotions below")}
//       />
//       <p>{status}</p>
//       <div>
//         <label>Valence (1-5): </label>
//         <input
//           type="range"
//           min="1"
//           max="5"
//           value={valence}
//           onChange={(e) => setValence(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Arousal (1-5): </label>
//         <input
//           type="range"
//           min="1"
//           max="5"
//           value={arousal}
//           onChange={(e) => setArousal(e.target.value)}
//         />
//       </div>
//       <button onClick={handleSubmitRating}>Submit Rating</button>
//       <p>
//         Progress: {currentClip + 1}/{clips.length}
//       </p>
//     </div>
//   );
// };

// export default PlaylistPage;


// PlaylistPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 🟢 ADDED useLocation
import MessageBox from "../components/MessageBox";
import ProgressBar from "../components/ProgressBar"; // ✅ FIXED import

const PlaylistPage = ({ userId: propUserId }) => {
  const [clips, setClips] = useState([]);
  const [currentClip, setCurrentClip] = useState(0);
  const [valence, setValence] = useState(3);
  const [arousal, setArousal] = useState(3);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 🟢
  const backendUrl = "http://localhost:5000";

  // 🟢 Load userId either from props or navigation state
  const userId = propUserId || location.state?.userId;
  const resumeAt = location.state?.resumeAt || 0; // 🟢

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await fetch(`${backendUrl}/playlist/${userId}`);
        const data = await res.json();
        setClips(data.clips);
      } catch (err) {
        console.error("Error fetching playlist:", err);
      }
    };
    fetchPlaylist();
  }, [userId]);

  // 🟢 If returning from fatigue, resume from next clip
  useEffect(() => {
    if (resumeAt > 0) {
      setCurrentClip(resumeAt);
    }
  }, [resumeAt]);

  const handleSubmitRating = async () => {
    const clip = clips[currentClip];
    const res=await fetch(`${backendUrl}/save_emotion_response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        clip_title: clip.title,
        induced_valence: valence,
        induced_arousal: arousal,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      alert(`❌ Error: ${data.error || "Failed to save rating"}`);
      return;
    }

    alert("✅ Rating saved successfully!");
    await fetch(`${backendUrl}/progress`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId, currentIndex: currentClip + 1 }),
});

    // 🟢 Navigate to fatigue survey at checkpoints
    if (currentClip === 7 || currentClip === 15) {
      navigate("/fatigue", { state: { userId, nextClip: currentClip + 1 } });
    } else if (currentClip < clips.length - 1) {
      setCurrentClip(currentClip + 1);
    } else {
      setStatus("✅ Experiment complete!");
      navigate("/results", { state: { userId } });

    }
  };

  if (!clips.length) return <MessageBox message="Loading playlist..." />;

  const clip = clips[currentClip];
  return (
    <div className="page">
      <h2>{clip.title}</h2>

      {/* 🟢 Progress bar */}
      <ProgressBar current={currentClip + 1} total={clips.length} />

      <video
        src={clip.file_url}
        width="640"
        height="360"
        controls
        onEnded={() => setStatus("Rate your emotions below")}
      />

      <p>{status}</p>
        <div>
            Valence (1-5):Ranges from Negative (left,1) to Positive (right, 5). Describes how
            pleasant or unpleasant you feel. Left side represents negative
            emotions like sadness or anger, while the right side represents
            positive emotions like happiness or joy.
        </div>
      <div>
        <label><b>Rate your valence emotions(1-5):</b> </label>
        <input
          type="range"
          min="1"
          max="5"
          value={valence}
          onChange={(e) => setValence(e.target.value)}
        />
      </div>
        <div>
            Arousal (1-5) Ranges from Calm (left , 1) to Excited (right, 5). Describes your
            level of activation or energy. left represents low energy states
            like calmness or tiredness, while the right represents high energy
            states like excitement or anxiety.
        </div>
      <div>
        <label><b>Rate your Arousal (1-5):</b> </label>
        <input
          type="range"
          min="1"
          max="5"
          value={arousal}
          onChange={(e) => setArousal(e.target.value)}
        />
      </div>

      <button onClick={handleSubmitRating}>Submit Rating</button>

      <p>
        Progress: {currentClip + 1}/{clips.length}
      </p>
    </div>
  );
};

export default PlaylistPage;
