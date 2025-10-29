import React from "react";

const ProgressBar = ({ current, total }) => {
  const percent = (current / total) * 100;
  return (
    <div style={{ width: "100%", background: "#ddd", borderRadius: "8px", margin: "10px 0" }}>
      <div
        style={{
          width: `${percent}%`,
          height: "8px",
          background: "#1976d2",
          borderRadius: "8px",
          transition: "width 0.3s ease",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
