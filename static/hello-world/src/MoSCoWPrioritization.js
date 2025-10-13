// import React, { useState, useEffect } from "react";
// // import PermissionsConfiguration from "./PermissionConfiguration";

// // Import SVGs as React components
// import { ReactComponent as MIcon } from "./images/K.svg";
// import { ReactComponent as SIcon } from "./images/K.svg";
// import { ReactComponent as CIcon } from "./images/K.svg";
// import { ReactComponent as WIcon } from "./images/K.svg";

// // Define MoSCoW constants
// const MOSCOW_KEYS = ["M", "S", "C", "W"];
// const MOSCOW_WORDS = { M: "MUST", S: "SHOULD", C: "COULD", W: "WOULD" };
// const MOSCOW_COLORS = { M: "#36b37e", S: "#00b8d9", C: "#ffab00", W: "#ff5630" };

// // Map keys to imported SVG components
// const MOSCOW_ICONS = { M: MIcon, S: SIcon, C: CIcon, W: WIcon };

// function MoSCoWPrioritization({ onNext, onClose, fieldName, fieldDesc }) {
//   const [activeTab, setActiveTab] = useState("Configuration");
//   const [viewType, setViewType] = useState("Labeled");
//   const [activeCategory, setActiveCategory] = useState("M");

//   const [selectedPermissions, setSelectedPermissions] = useState({
//     M: { users: [], groups: [], roles: [] },
//     S: { users: [], groups: [], roles: [] },
//     C: { users: [], groups: [], roles: [] },
//     W: { users: [], groups: [], roles: [] },
//   });

//   // MoSCoW data array (used for rendering)
//   const MOSCOW = MOSCOW_KEYS.map((key) => ({
//     key,
//     word: MOSCOW_WORDS[key],
//     bg: MOSCOW_COLORS[key],
//     Icon: MOSCOW_ICONS[key],
//   }));

//   useEffect(() => {
//     console.log("Parent selectedPermissions updated:", selectedPermissions);
//   }, [selectedPermissions]);

//   const handleNext = () => {
//     const fieldData = {
//       name: fieldName,
//       type: "MoSCoW Prioritization",
//       usage: "0 issues",
//       description: fieldDesc,
//       view: viewType,
//       permissions: selectedPermissions,
//       // icons: MOSCOW_KEYS.reduce((acc, key) => {
//       //   acc[key] = K.svg; // or actual file name
//       //   return acc;
//       // }, {}),
//     };
//     console.log("Final MoSCoW Field Data:", fieldData);
//     onNext(fieldData);
//   };

//   return (
//     <div style={{ padding: "10px" }}>
//       {/* Tabs */}
//       <div style={{ borderBottom: "1px solid #ccc", marginBottom: "15px", display: "flex" }}>
//         {["Configuration", "Edit Permissions"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             style={{
//               border: "none",
//               background: "transparent",
//               padding: "8px 16px",
//               fontWeight: "bold",
//               borderBottom: activeTab === tab ? "2px solid #0052cc" : "2px solid transparent",
//               cursor: "pointer",
//               color: activeTab === tab ? "#0052cc" : "#555",
//             }}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Configuration Tab */}
//       {activeTab === "Configuration" && (
//         <div style={{ display: "flex", gap: "30px" }}>
//           {/* Left Side */}
//           <div style={{ flex: 1 }}>
//             <h3>Use MoSCoW categories to prioritize and understand business value</h3>
//             <div style={{ marginTop: "20px" }}>
//               <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>View</label>
//               <label style={{ marginRight: "20px" }}>
//                 <input
//                   type="radio"
//                   value="Shortened"
//                   checked={viewType === "Shortened"}
//                   onChange={(e) => setViewType(e.target.value)}
//                 />{" "}
//                 Shortened
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="Labeled"
//                   checked={viewType === "Labeled"}
//                   onChange={(e) => setViewType(e.target.value)}
//                 />{" "}
//                 Labeled
//               </label>
//             </div>
//           </div>

//           {/* Right Side Preview */}
//           <div
//             style={{
//               flex: 1,
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               padding: "15px",
//               background: "#fafafa",
//             }}
//           >
//             <h4 style={{ marginBottom: "10px" }}>Preview</h4>
//             <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
//               {MOSCOW.map((m) => {
//                 const perms = selectedPermissions[m.key] || { users: [], groups: [], roles: [] };
//                 const Icon = m.Icon;
//                 return (
//                   <div
//                     key={m.key}
//                     style={{
//                       border: `1px solid ${m.bg}`,
//                       borderRadius: "8px",
//                       padding: "8px",
//                       background: "#fff",
//                     }}
//                   >
//                     {/* SVG Icon */}
//                     <Icon width={40} height={40} style={{ marginBottom: "6px" }} />

//                     {/* Category Label */}
//                     <div
//                       style={{
//                         background: m.bg,
//                         color: "#fff",
//                         padding: "6px 10px",
//                         borderRadius: "16px",
//                         fontWeight: "bold",
//                         display: "inline-block",
//                         marginBottom: "6px",
//                       }}
//                     >
//                       {m.key} {viewType === "Labeled" && m.word}
//                     </div>

//                     {/* Permissions */}
//                     <div style={{ fontSize: "13px", color: "#333" }}>
//                       {perms.users?.length > 0 && <div><strong>Users:</strong> {perms.users.join(", ")}</div>}
//                       {perms.groups?.length > 0 && <div><strong>Groups:</strong> {perms.groups.join(", ")}</div>}
//                       {perms.roles?.length > 0 && <div><strong>Roles:</strong> {perms.roles.join(", ")}</div>}
//                       {perms.users?.length === 0 && perms.groups?.length === 0 && perms.roles?.length === 0 && (
//                         <div style={{ color: "#999" }}>No permissions assigned</div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Permissions Tab */}
//       {activeTab === "Edit Permissions" && (
//         <div>
//           <label style={{ marginBottom: "8px", display: "block", fontWeight: "bold" }}>
//             Select MoSCoW Category:
//           </label>
//           <select
//             value={activeCategory}
//             onChange={(e) => setActiveCategory(e.target.value)}
//             style={{ marginBottom: "15px", padding: "6px", borderRadius: "4px" }}
//           >
//             {MOSCOW.map((m) => (
//               <option key={m.key} value={m.key}>
//                 {m.word}
//               </option>
//             ))}
//           </select>

//           {/* <PermissionsConfiguration
//             selectedPermissions={selectedPermissions[activeCategory]}
//             setSelectedPermissions={(updated) => {
//               console.log(Updating permissions for category ${activeCategory}:, updated);
//               setSelectedPermissions((prev) => ({
//                 ...prev,
//                 [activeCategory]: {
//                   users: updated.users || [],
//                   groups: updated.groups || [],
//                   roles: updated.roles || [],
//                 },
//               }));
//             }}
//           /> */}
//         </div>
//       )}

//       {/* Footer */}
//       <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px" }}>
//         <button
//           onClick={onClose}
//           style={{
//             background: "#f4f5f7",
//             border: "1px solid #ccc",
//             padding: "6px 12px",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleNext}
//           style={{
//             background: "#0052cc",
//             color: "#fff",
//             border: "none",
//             padding: "6px 12px",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MoSCoWPrioritization;

































import React, { useEffect, useMemo, useState } from "react";


/* ---------- Inline SVGs for MoSCoW ---------- */
const MIcon = (p) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...p}>
    <circle cx="32" cy="32" r="30" fill="#4fd1d9" />
    <path
      d="M37.3 17.5H46v29h-5.7V22.1l-5.5 24.4H29l-5.5-24.4v24.4H18v-29h8.8l5.3 22.8 5.2-22.8"
      fill="#ffffff"
    />
  </svg>
);
const SIcon = (p) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...p}>
    <circle cx="32" cy="32" r="30" fill="#4fd1d9" />
    <path d="M25.8 37.6c.2 1.3.6 2.3 1.1 3c1 1.2 2.7 1.8 5.2 1.8c1.5 0 2.6-.2 3.6-.5c1.7-.6 2.6-1.7 2.6-3.4c0-1-.4-1.7-1.3-2.2c-.8-.5-2.2-1-4-1.4l-3.1-.7c-3.1-.7-5.2-1.4-6.4-2.2c-2-1.3-2.9-3.4-2.9-6.3c0-2.6 1-4.8 2.9-6.5c1.9-1.7 4.7-2.6 8.4-2.6c3.1 0 5.7.8 7.9 2.4c2.2 1.6 3.3 4 3.4 7.1h-5.8c-.1-1.7-.9-3-2.3-3.7c-1-.5-2.2-.7-3.6-.7c-1.6 0-2.9.3-3.8.9s-1.4 1.5-1.4 2.6c0 1 .5 1.8 1.4 2.3c.6.3 1.9.7 3.9 1.2l5.1 1.2c2.2.5 3.9 1.2 5 2.1c1.7 1.4 2.6 3.3 2.6 5.9c0 2.7-1 4.9-3.1 6.6c-2 1.8-4.9 2.6-8.7 2.6c-3.8 0-6.8-.9-9-2.6c-2.4-1.5-3.5-3.9-3.5-6.9h5.8" />
  </svg>
);
const CIcon = (p) => (
  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" {...p}>
    <path
      fill="#3B88C3"
      d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
    />
    <path
      fill="#FFF"
      d="M19.723 6.552c2.264 0 6.666.744 6.666 3.473c0 1.116-.775 2.077-1.922 2.077c-1.272 0-2.139-1.085-4.744-1.085c-3.844 0-5.829 3.256-5.829 7.038c0 3.689 2.015 6.852 5.829 6.852c2.605 0 3.658-1.302 4.93-1.302c1.396 0 2.047 1.395 2.047 2.107c0 2.977-4.682 3.659-6.976 3.659c-6.294 0-10.666-4.992-10.666-11.41c-.001-6.448 4.34-11.409 10.665-11.409z"
    />
  </svg>
);
const WIcon = (p) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...p}>
    <circle cx="32" cy="32" r="30" fill="#4fd1d9" />
    <path
      d="M20 17.5l3.8 16.6l.8 4.6l.8-4.5l3.3-16.7h6.4l3.4 16.6l.9 4.6l.9-4.4l3.9-16.8h6.2l-8.2 29h-5.8l-3.5-17l-1-5.6l-1 5.6l-3.5 17h-5.6l-8.2-29H20"
      fill="#ffffff"
    />
  </svg>
);


/* ---------- Design tokens ---------- */
const TOKENS = {
  primary: "#0052CC",
  neutral0: "#FFFFFF",
  neutral100: "#F4F5F7",
  neutral200: "#EBECF0",
  neutral300: "#DFE1E6",
  neutral600: "#5E6C84",
  text: "#172B4D",
  shadow: "0 1px 2px rgba(9,30,66,.15)",
};


const MOSCOW_KEYS = ["M", "S", "C", "W"];
const MOSCOW_WORDS = {
  M: "Must have",
  S: "Should have",
  C: "Could have",
  W: "Won't have (this time)",
};
const MOSCOW_COLORS = { M: "#0052CC", S: "#00A3BF", C: "#36B37E", W: "#FF5630" };
const MOSCOW_ICONS = { M: MIcon, S: SIcon, C: CIcon, W: WIcon };


const hexToRgba = (hex, alpha = 0.12) => {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


/* ---------- Component ---------- */
function MoSCoWPrioritization({
  onNext = () => {},
  onClose = () => {},
  fieldName = "",
  fieldDesc = "",
}) {
  const [activeTab, setActiveTab] = useState("Configuration");
  const [viewType, setViewType] = useState("Labeled");
  const [activeCategory, setActiveCategory] = useState("M");


  const [selectedPermissions, setSelectedPermissions] = useState({
    M: { users: [], groups: [], roles: [], effectiveDate: "" },
    S: { users: [], groups: [], roles: [], effectiveDate: "" },
    C: { users: [], groups: [], roles: [], effectiveDate: "" },
    W: { users: [], groups: [], roles: [], effectiveDate: "" },
  });


  const MOSCOW = useMemo(
    () =>
      MOSCOW_KEYS.map((key) => ({
        key,
        word: MOSCOW_WORDS[key],
        color: MOSCOW_COLORS[key],
        tint: hexToRgba(MOSCOW_COLORS[key], 0.1),
        border: hexToRgba(MOSCOW_COLORS[key], 0.4),
        Icon: MOSCOW_ICONS[key],
      })),
    []
  );


  const handleNext = () => {
    const permissionDates = MOSCOW_KEYS.reduce((acc, k) => {
      acc[k] = selectedPermissions[k]?.effectiveDate || null;
      return acc;
    }, {});
    const fieldData = {
      name: fieldName,
      type: "MoSCoW Prioritization",
      usage: "0 issues",
      description: fieldDesc,
      view: viewType,
      permissions: selectedPermissions,
      permissionDates,
    };
    onNext(fieldData);
  };


  return (
    <div
      style={{
        padding: 16,
        color: TOKENS.text,
        fontFamily:
          "Inter, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          Use MoSCoW categories to prioritize and understand business value
        </div>
        {fieldDesc && (
          <div
            style={{ fontSize: 13, color: TOKENS.neutral600, marginTop: 4 }}
          >
            {fieldDesc}
          </div>
        )}
      </div>


      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 20,
          borderBottom: `1px solid ${TOKENS.neutral300}`,
          marginBottom: 16,
        }}
      >
        {["Configuration", "Edit Permissions"].map((tab) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "transparent",
                border: "none",
                padding: "10px 4px",
                marginBottom: -1,
                fontWeight: 600,
                color: active ? TOKENS.primary : TOKENS.neutral600,
                borderBottom: `2px solid ${
                  active ? TOKENS.primary : "transparent"
                }`,
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>


      {/* ---------- CONFIGURATION TAB ---------- */}
      {activeTab === "Configuration" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>View</div>
            <div
              style={{
                display: "inline-flex",
                border: `1px solid ${TOKENS.neutral300}`,
                background: TOKENS.neutral100,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: TOKENS.shadow,
              }}
            >
              {["Shortened", "Labeled"].map((opt) => {
                const selected = viewType === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setViewType(opt)}
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      background: selected ? TOKENS.neutral0 : "transparent",
                      color: selected ? TOKENS.text : TOKENS.neutral600,
                      cursor: "pointer",
                      fontWeight: 600,
                      minWidth: 110,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <p style={{ marginTop: 12, fontSize: 12, color: TOKENS.neutral600 }}>
              “Shortened” shows just M / S / C / W. “Labeled” adds the full label.
            </p>
          </div>


          {/* Preview */}
          <div
            style={{
              border: `1px solid ${TOKENS.neutral300}`,
              borderRadius: 10,
              background: TOKENS.neutral0,
              boxShadow: TOKENS.shadow,
              padding: 16,
              maxHeight: 420,
              overflow: "auto",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Preview</div>
            <div style={{ display: "grid", gap: 12 }}>
              {MOSCOW.map((m) => {
                const perms =
                  selectedPermissions[m.key] || {};
                const Icon = m.Icon;
                return (
                  <div
                    key={m.key}
                    style={{
                      border: `1px solid ${m.border}`,
                      borderRadius: 12,
                      padding: 12,
                      background: TOKENS.neutral0,
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: m.tint,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <Icon width={18} height={18} />
                      </div>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          fontWeight: 700,
                          padding: "6px 10px",
                          borderRadius: 999,
                          background: m.tint,
                          color: m.color,
                          border: `1px solid ${m.border}`,
                        }}
                      >
                        <span>{m.key}</span>
                        {viewType === "Labeled" && <span>{m.word}</span>}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: TOKENS.neutral600 }}>
                      {perms.users?.length > 0 && (
                        <div>
                          <strong>Users:</strong> {perms.users.join(", ")}
                        </div>
                      )}
                      {perms.groups?.length > 0 && (
                        <div>
                          <strong>Groups:</strong> {perms.groups.join(", ")}
                        </div>
                      )}
                      {perms.roles?.length > 0 && (
                        <div>
                          <strong>Roles:</strong> {perms.roles.join(", ")}
                        </div>
                      )}
                      {perms.effectiveDate && (
                        <div>
                          <strong>Effective Date:</strong>{" "}
                          {perms.effectiveDate}
                        </div>
                      )}
                      {!perms.users?.length &&
                        !perms.groups?.length &&
                        !perms.roles?.length &&
                        !perms.effectiveDate && (
                          <div>No permissions assigned</div>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ---------- EDIT PERMISSIONS ---------- */
        <div style={{ display: "grid", gap: 20 }}>
          {/* Category Selector */}
          <div>
            <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>
              Select MoSCoW Category
            </label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {MOSCOW.map((m) => {
                const Icon = m.Icon;
                const isActive = activeCategory === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setActiveCategory(m.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: `2px solid ${
                        isActive ? m.color : TOKENS.neutral300
                      }`,
                      background: isActive ? m.tint : TOKENS.neutral100,
                      color: isActive ? m.color : TOKENS.text,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: isActive ? TOKENS.shadow : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: m.color,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon width={12} height={12} />
                    </div>
                    {m.word}
                  </button>
                );
              })}
            </div>
          </div>


          {/* Effective Date */}
          <div style={{ maxWidth: 280 }}>
            <label
              htmlFor="effective-date"
              style={{ fontWeight: 700, display: "block", marginBottom: 6 }}
            >
              Effective Date
            </label>
            <input
              id="effective-date"
              type="date"
              value={selectedPermissions[activeCategory]?.effectiveDate || ""}
              onChange={(e) =>
                setSelectedPermissions((prev) => ({
                  ...prev,
                  [activeCategory]: {
                    ...(prev[activeCategory] || {
                      users: [],
                      groups: [],
                      roles: [],
                    }),
                    effectiveDate: e.target.value,
                  },
                }))
              }
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                border: `1px solid ${TOKENS.neutral300}`,
                background: TOKENS.neutral0,
              }}
            />
          </div>


          {/* Permissions Configuration */}
          {/* <div
            style={{
              border: `1px solid ${TOKENS.neutral300}`,
              borderRadius: 10,
              padding: 16,
              background: TOKENS.neutral0,
              boxShadow: TOKENS.shadow,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10 }}>
              Configure Permissions for{" "}
              <span style={{ color: MOSCOW_COLORS[activeCategory] }}>
                {MOSCOW_WORDS[activeCategory]}
              </span>
            </div> */}


            {/* <PermissionConfiguration
              selectedPermissions={
                selectedPermissions[activeCategory] || {
                  users: [],
                  groups: [],
                  roles: [],
                }
              }
              setSelectedPermissions={(updatedPerms) =>
                setSelectedPermissions((prev) => ({
                  ...prev,
                  [activeCategory]: {
                    ...updatedPerms,
                    effectiveDate:
                      prev[activeCategory]?.effectiveDate || "",
                  },
                }))
              }
            /> */}
          {/* </div> */}
        </div>
      )}


      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 8 }}>
        <button
          onClick={onClose}
          style={{
            background: TOKENS.neutral100,
            border: `1px solid ${TOKENS.neutral300}`,
            padding: "8px 14px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          style={{
            background: TOKENS.primary,
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: TOKENS.shadow,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}


export default MoSCoWPrioritization;