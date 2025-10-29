import React from "react";

export default function MessageBox({ message, type }) {
  if (!message) return null;
  return (
    <div style={{
      padding: "10px",
      margin: "10px",
      borderRadius: "5px",
      backgroundColor: type === "error" ? "#ffcccc" : "#ccffcc",
      color: "#333"
    }}>
      {message}
    </div>
  );
}
