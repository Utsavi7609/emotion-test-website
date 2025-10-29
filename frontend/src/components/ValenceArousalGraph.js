// import React, { useRef, useEffect, useState } from "react";

// export default function ValenceArousalGraph({
//   valence,
//   arousal,
//   onValenceChange,
//   onArousalChange,
// }) {
//   const canvasRef = useRef(null);
//   const [hoveredPos, setHoveredPos] = useState(null);

//   const CANVAS_WIDTH = 400;
//   const CANVAS_HEIGHT = 400;
//   const PADDING = 40;
//   const GRID_SIZE = 5;
//   const DOT_RADIUS = 8;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.fillStyle = "#FFFFFF";
//     ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//     // Grid
//     ctx.strokeStyle = "#E8E8E8";
//     for (let i = 0; i <= GRID_SIZE; i++) {
//       const x = PADDING + (i / GRID_SIZE) * (CANVAS_WIDTH - 2 * PADDING);
//       const y = PADDING + (i / GRID_SIZE) * (CANVAS_HEIGHT - 2 * PADDING);
//       ctx.beginPath();
//       ctx.moveTo(x, PADDING);
//       ctx.lineTo(x, CANVAS_HEIGHT - PADDING);
//       ctx.stroke();
//       ctx.beginPath();
//       ctx.moveTo(PADDING, y);
//       ctx.lineTo(CANVAS_WIDTH - PADDING, y);
//       ctx.stroke();
//     }

//     // Axes
//     ctx.strokeStyle = "#000";
//     ctx.lineWidth = 2;
//     ctx.beginPath();
//     ctx.moveTo(PADDING, CANVAS_HEIGHT - PADDING);
//     ctx.lineTo(CANVAS_WIDTH - PADDING, CANVAS_HEIGHT - PADDING);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(PADDING, PADDING);
//     ctx.lineTo(PADDING, CANVAS_HEIGHT - PADDING);
//     ctx.stroke();

//     // Labels
//     ctx.fillStyle = "#000";
//     ctx.font = "12px Arial";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "top";
//     for (let i = 0; i <= GRID_SIZE; i++) {
//       const x = PADDING + (i / GRID_SIZE) * (CANVAS_WIDTH - 2 * PADDING);
//       ctx.fillText(i.toString(), x, CANVAS_HEIGHT - PADDING + 15);
//     }

//     ctx.textAlign = "right";
//     ctx.textBaseline = "middle";
//     for (let i = 0; i <= GRID_SIZE; i++) {
//       const y = CANVAS_HEIGHT - PADDING - (i / GRID_SIZE) * (CANVAS_HEIGHT - 2 * PADDING);
//       ctx.fillText(i.toString(), PADDING - 10, y);
//     }

//     // Axis titles
//     ctx.font = "bold 14px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText(
//       "Valence (Negative → Positive)",
//       CANVAS_WIDTH / 2,
//       CANVAS_HEIGHT - 5
//     );
//     ctx.save();
//     ctx.translate(15, CANVAS_HEIGHT / 2);
//     ctx.rotate(-Math.PI / 2);
//     ctx.fillText("Arousal (Calm → Excited)", 0, 0);
//     ctx.restore();

//     // Dots
//     // const dotX =
//     //   PADDING + (valence / GRID_SIZE) * (CANVAS_WIDTH - 2 * PADDING);
//     // const dotY =
//     //   CANVAS_HEIGHT -
//     //   PADDING -
//     //   (arousal / GRID_SIZE) * (CANVAS_HEIGHT - 2 * PADDING);

//     // ctx.fillStyle = "#0D7377";
//     // ctx.beginPath();
//     // ctx.arc(dotX, dotY, DOT_RADIUS, 0, 2 * Math.PI);
//     // ctx.fill();

//     if (hoveredPos) {
//       ctx.fillStyle = "rgba(13,115,119,0.3)";
//       ctx.beginPath();
//       ctx.arc(hoveredPos.x, hoveredPos.y, DOT_RADIUS, 0, 2 * Math.PI);
//       ctx.fill();
//     }
//   }, [valence, arousal, hoveredPos]);

//   const handleClick = (e) => {
//     const rect = e.target.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const newValence = Math.max(
//       0,
//       Math.min(GRID_SIZE, ((x - PADDING) / (CANVAS_WIDTH - 2 * PADDING)) * GRID_SIZE)
//     );
//     const newArousal = Math.max(
//       0,
//       Math.min(GRID_SIZE, ((CANVAS_HEIGHT - PADDING - y) / (CANVAS_HEIGHT - 2 * PADDING)) * GRID_SIZE)
//     );
//     onValenceChange(Math.round(newValence * 10) / 10);
//     onArousalChange(Math.round(newArousal * 10) / 10);
//   };

//   const handleHover = (e) => {
//     const rect = e.target.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     if (
//       x >= PADDING &&
//       x <= CANVAS_WIDTH - PADDING &&
//       y >= PADDING &&
//       y <= CANVAS_HEIGHT - PADDING
//     ) {
//       setHoveredPos({ x, y });
//     } else {
//       setHoveredPos(null);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <canvas
//         ref={canvasRef}
//         width={CANVAS_WIDTH}
//         height={CANVAS_HEIGHT}
//         onClick={handleClick}
//         onMouseMove={handleHover}
//         onMouseLeave={() => setHoveredPos(null)}
//         className="border border-gray-300 rounded-lg cursor-crosshair"
//       />
//       {hoveredPos && (
//         <p className="mt-2 text-sm text-gray-600">
//           V:{" "}
//           {(
//             ((hoveredPos.x - PADDING) / (CANVAS_WIDTH - 2 * PADDING)) *
//             GRID_SIZE
//           ).toFixed(1)}
//           , A:{" "}
//           {(
//             ((CANVAS_HEIGHT - PADDING - hoveredPos.y) /
//               (CANVAS_HEIGHT - 2 * PADDING)) *
//             GRID_SIZE
//           ).toFixed(1)}
//         </p>
//       )}
//     </div>
//   );
// }

import React, { useRef, useEffect, useState } from "react";

export default function ValenceArousalGraph({
  valence,
  arousal,
  onValenceChange,
  onArousalChange,
}) {
  const canvasRef = useRef(null);
  const [hoveredPos, setHoveredPos] = useState(null);
  const [clickedPos, setClickedPos] = useState(null); // ✅ added to store the fixed dot position

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 400;
  const PADDING = 40;
  const GRID_SIZE = 5;
  const DOT_RADIUS = 8;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Grid lines
    ctx.strokeStyle = "#E8E8E8";
    for (let i = 0; i <= GRID_SIZE; i++) {
      const x = PADDING + (i / GRID_SIZE) * (CANVAS_WIDTH - 2 * PADDING);
      const y = PADDING + (i / GRID_SIZE) * (CANVAS_HEIGHT - 2 * PADDING);
      ctx.beginPath();
      ctx.moveTo(x, PADDING);
      ctx.lineTo(x, CANVAS_HEIGHT - PADDING);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(PADDING, y);
      ctx.lineTo(CANVAS_WIDTH - PADDING, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(PADDING, CANVAS_HEIGHT - PADDING);
    ctx.lineTo(CANVAS_WIDTH - PADDING, CANVAS_HEIGHT - PADDING);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(PADDING, PADDING);
    ctx.lineTo(PADDING, CANVAS_HEIGHT - PADDING);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let i = 0; i <= GRID_SIZE; i++) {
      const x = PADDING + (i / GRID_SIZE) * (CANVAS_WIDTH - 2 * PADDING);
      ctx.fillText(i.toString(), x, CANVAS_HEIGHT - PADDING + 15);
    }

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= GRID_SIZE; i++) {
      const y =
        CANVAS_HEIGHT - PADDING - (i / GRID_SIZE) * (CANVAS_HEIGHT - 2 * PADDING);
      ctx.fillText(i.toString(), PADDING - 10, y);
    }

    // Axis titles
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "Valence (Negative → Positive)",
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - 5
    );
    ctx.save();
    ctx.translate(15, CANVAS_HEIGHT / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Arousal (Calm → Excited)", 0, 0);
    ctx.restore();

    // ✅ Persistent clicked dot
    if (clickedPos) {
      ctx.fillStyle = "#0D7377";
      ctx.beginPath();
      ctx.arc(clickedPos.x, clickedPos.y, DOT_RADIUS, 0, 2 * Math.PI);
      ctx.fill();

      // ✅ Display coordinates above the dot
      ctx.fillStyle = "#0D7377";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        `V: ${valence.toFixed(1)}, A: ${arousal.toFixed(1)}`,
        clickedPos.x,
        clickedPos.y - 15
      );
    }

    // ✅ Hover effect (faint preview dot)
    if (hoveredPos) {
      ctx.fillStyle = "rgba(13,115,119,0.3)";
      ctx.beginPath();
      ctx.arc(hoveredPos.x, hoveredPos.y, DOT_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [valence, arousal, hoveredPos, clickedPos]); // ✅ added clickedPos dependency

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newValence = Math.max(
      0,
      Math.min(GRID_SIZE, ((x - PADDING) / (CANVAS_WIDTH - 2 * PADDING)) * GRID_SIZE)
    );
    const newArousal = Math.max(
      0,
      Math.min(
        GRID_SIZE,
        ((CANVAS_HEIGHT - PADDING - y) / (CANVAS_HEIGHT - 2 * PADDING)) * GRID_SIZE
      )
    );

    onValenceChange(Math.round(newValence * 10) / 10);
    onArousalChange(Math.round(newArousal * 10) / 10);

    // ✅ Update clicked position (makes dot persist)
    setClickedPos({ x, y });
  };

  const handleHover = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (
      x >= PADDING &&
      x <= CANVAS_WIDTH - PADDING &&
      y >= PADDING &&
      y <= CANVAS_HEIGHT - PADDING
    ) {
      setHoveredPos({ x, y });
    } else {
      setHoveredPos(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleClick}
        onMouseMove={handleHover}
        onMouseLeave={() => setHoveredPos(null)}
        className="border border-gray-300 rounded-lg cursor-crosshair"
      />
      {hoveredPos && (
        <p className="mt-2 text-sm text-gray-600">
          V:{" "}
          {(
            ((hoveredPos.x - PADDING) / (CANVAS_WIDTH - 2 * PADDING)) *
            GRID_SIZE
          ).toFixed(1)}
          , A:{" "}
          {(
            ((CANVAS_HEIGHT - PADDING - hoveredPos.y) /
              (CANVAS_HEIGHT - 2 * PADDING)) *
            GRID_SIZE
          ).toFixed(1)}
        </p>
      )}
    </div>
  );
}
