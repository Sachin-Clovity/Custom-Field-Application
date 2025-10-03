import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TShirtSizeConfig() {
  const { state } = useLocation(); // Access passed template data from the navigation state
  const { template } = state || {}; // Template passed from CreateCustomField page
  const navigate = useNavigate();

  const [fieldName, setFieldName] = useState("");   // Field name state
  const [fieldDesc, setFieldDesc] = useState("");   // Field description state
  const [view, setView] = useState("Filled");       // Default view type
  const [color, setColor] = useState("#2684ff");     // Default color
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]; // Available T-shirt sizes

  const handleFinish = () => {
    // Handle the finish action when user is done configuring the field
    alert(`Field created: ${fieldName}`);
    // You can save or send the data to the backend here.
    navigate("/");  // Redirect to the home page or another route
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Configure {template?.name || "T-Shirt Size"} Field</h2>
      <p>The name and description help to identify your custom field.</p>

      {/* Basic Information Form */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>Field Name*</label>
        <input
          type="text"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          placeholder="Enter a field name"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>Description</label>
        <input
          type="text"
          value={fieldDesc}
          onChange={(e) => setFieldDesc(e.target.value)}
          placeholder="Enter a field description"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* View Options (Filled or Outlined) */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>View</label>
        <div>
          <label style={{ marginRight: "15px" }}>
            <input
              type="radio"
              value="Filled"
              checked={view === "Filled"}
              onChange={(e) => setView(e.target.value)}
            />
            Filled
          </label>
          <label>
            <input
              type="radio"
              value="Outlined"
              checked={view === "Outlined"}
              onChange={(e) => setView(e.target.value)}
            />
            Outlined
          </label>
        </div>
      </div>

      {/* Color Picker */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }}>Color</label>
        <div>
          {["#de350b", "#ff5630", "#36b37e", "#2684ff", "#6554c0", "#00b8d9"].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                backgroundColor: c,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginRight: "10px",
                border: color === c ? "3px solid #0052cc" : "none",
                cursor: "pointer"
              }}
            />
          ))}
        </div>
      </div>

      {/* Size Options (XXS, XS, etc.) */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Available Sizes</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
          {sizes.map((size) => (
            <div
              key={size}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "15px",
                background: "#fafafa",
                textAlign: "center"
              }}
            >
              <label>
                <input type="checkbox" /> {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: Cancel, Back, Finish */}
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button onClick={() => navigate("/")}>Cancel</button>
        <button onClick={() => navigate("/create")}>Back</button>
        <button
          onClick={handleFinish}
          style={{
            background: "#0052cc",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default TShirtSizeConfig;
