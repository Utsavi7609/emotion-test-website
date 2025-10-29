// import React from "react";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import StudyPage from "./pages/StudyPage";



// function App() {
//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Emotion Study App</h1>
//       <Signup />
//       <hr />
//       <Login />
//     </div>
    
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StudyPage from "./pages/StudyPage";
import BaselinePage from "./pages/BaselinePage"; // ✅ new page
import RateEmotionPage from "./pages/RateEmotionPage";
import FatiguePage from "./pages/FatiguePage";
import PlaylistPage from "./pages/PlaylistPage";
import ThankYouPage from "./pages/ThankYouPage";
import ResultsPage from "./pages/ResultsPage";


function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>Emotion Study App</h1>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/baseline" element={<BaselinePage />} /> {/* ✅ */}
          <Route path="/rate-emotion" element={<RateEmotionPage />} />
          <Route path="/fatigue" element={<FatiguePage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
