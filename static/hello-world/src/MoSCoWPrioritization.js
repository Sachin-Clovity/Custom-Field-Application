import React, { useState } from "react";

// MoSCoW Prioritization categories
const MOSCOW = [
  { key: "M", word: "MUST", bg: "#36b37e" },
  { key: "S", word: "SHOULD", bg: "#00b8d9" },
  { key: "C", word: "COULD", bg: "#ffab00" },
  { key: "W", word: "WOULD", bg: "#ff5630" }
];

function MoSCoWPrioritization({ onNext, onClose, fieldName, fieldDesc }) {
  const [viewType, setViewType] = useState("Labeled"); // "Shortened" or "Labeled"

  const handleNext = () => {
    // Instead of closing, tell parent we are ready for next step
    onNext({
      name: fieldName,
      type: "MoSCoW Prioritization",
      usage: "0 issues",
      description: fieldDesc,
      view: viewType
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #ccc", marginBottom: "15px" }}>
        <button
          style={{
            border: "none",
            background: "transparent",
            padding: "8px 16px",
            fontWeight: "bold",
            borderBottom: "2px solid #0052cc",
            cursor: "pointer"
          }}
        >
          Configuration
        </button>
        <button
          style={{
            border: "none",
            background: "transparent",
            padding: "8px 16px",
            cursor: "not-allowed",
            color: "#888"
          }}
          disabled
        >
          Edit Permissions
        </button>
      </div>

      <div style={{ display: "flex", gap: "30px" }}>
        {/* Left Side: Options */}
        <div style={{ flex: 1 }}>
          <h3>Use MoSCoW categories to prioritize and understand the business value</h3>

          {/* View Options */}
          <div style={{ marginTop: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>
              View
            </label>
            <label style={{ marginRight: "20px" }}>
              <input
                type="radio"
                value="Shortened"
                checked={viewType === "Shortened"}
                onChange={(e) => setViewType(e.target.value)}
              />
              Shortened
            </label>
            <label>
              <input
                type="radio"
                value="Labeled"
                checked={viewType === "Labeled"}
                onChange={(e) => setViewType(e.target.value)}
              />
              Labeled
            </label>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div
          style={{
            flex: 1,
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            background: "#fafafa"
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>Preview</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {MOSCOW.map((m) => (
              <div
                key={m.key}
                style={{
                  background: m.bg,
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span>{m.key}</span>
                {viewType === "Labeled" && <span>{m.word}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px" }}>
        <button
          onClick={onClose}
          style={{
            background: "#f4f5f7",
            border: "1px solid #ccc",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          style={{
            background: "#0052cc",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MoSCoWPrioritization;
