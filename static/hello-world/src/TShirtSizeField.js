// // TShirtSizeField.jsx
// import React, { useEffect, useMemo, useState } from "react";


// /* ---------- Design tokens (Atlassian-ish) ---------- */
// const TOKENS = {
//   primary: "#0052CC",
//   neutral0: "#FFFFFF",
//   neutral50: "#FAFBFC",
//   neutral100: "#F4F5F7",
//   neutral200: "#EBECF0",
//   neutral300: "#DFE1E6",
//   neutral600: "#5E6C84",
//   text: "#172B4D",
//   shadow: "0 1px 2px rgba(9,30,66,.15)",
// };


// /* ---------- Helpers ---------- */
// const hexToRgba = (hex, alpha = 0.12) => {
//   const h = hex.replace("#", "");
//   const bigint = parseInt(h, 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;
//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };


// /* ---------- Label Tag Icon ---------- */
// const TagIcon = ({ color = "#FF5630", size = 18 }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M20.59 13.41l-7.99 7.99a2 2 0 0 1-2.83 0l-7.17-7.17a2 2 0 0 1-.58-1.41V5a2 2 0 0 1 2-2h7.82c.53 0 1.04.21 1.41.59l7.99 7.99a2 2 0 0 1 0 2.83zM7.5 8A1.5 1.5 0 1 0 7.5 5a1.5 1.5 0 0 0 0 3z"
//       fill={color}
//     />
//   </svg>
// );


// /* ---------- Defaults ---------- */
// const DEFAULT_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
// const COLOR_PALETTE = [
//   "#DE350B", // red (Atlassian-ish)
//   "#FF8B00", // orange
//   "#36B37E", // green
//   "#00A3BF", // teal
//   "#00B8D9", // cyan
//   "#2684FF", // blue
//   "#6554C0", // purple
//   "#5243AA", // indigo
//   "#A5ADBA", // gray
// ];


// /* ---------- Component ---------- */
// function TShirtSizeField({
//   onNext = () => {},
//   onClose = () => {},
//   fieldName = "",
//   fieldDesc = "",
//   sizes = DEFAULT_SIZES,
// }) {
//   const [activeTab, setActiveTab] = useState("Configuration");
//   const [viewType, setViewType] = useState("Filled"); // "Filled" | "Outlined"
//   const [color, setColor] = useState(COLOR_PALETTE[0]);
//   const [activeSize, setActiveSize] = useState(sizes[0] || "M");


//   // permissions per size
//   const [selectedPermissions, setSelectedPermissions] = useState(
//     sizes.reduce((acc, s) => {
//       acc[s] = { users: [], groups: [], roles: [] };
//       return acc;
//     }, {})
//   );


//   // derived styling from chosen color
//   const theme = useMemo(
//     () => ({
//       color,
//       tint: hexToRgba(color, 0.12),
//       border: hexToRgba(color, 0.4),
//       hardBorder: color,
//       textOnTint: color,
//     }),
//     [color]
//   );


//   useEffect(() => {
//     // eslint-disable-next-line no-console
//     console.log("T-Shirt size permissions:", selectedPermissions);
//   }, [selectedPermissions]);


//   const handleNext = () => {
//     const fieldData = {
//       name: fieldName,
//       type: "T-Shirt Size",
//       usage: "0 issues",
//       description: fieldDesc,
//       view: viewType,
//       color,
//       permissions: selectedPermissions,
//       options: sizes,
//     };
//     // eslint-disable-next-line no-console
//     console.log("Final T-Shirt Field Data:", fieldData);
//     onNext(fieldData);
//   };


//   const LabelChip = ({ s }) => {
//     const filled = viewType === "Filled";
//     return (
//       <span
//         style={{
//           display: "inline-flex",
//           alignItems: "center",
//           gap: 8,
//           fontWeight: 700,
//           padding: "6px 10px",
//           borderRadius: 999,
//           background: filled ? theme.tint : TOKENS.neutral0,
//           color: filled ? theme.textOnTint : theme.color,
//           border: `1px solid ${filled ? theme.border : theme.hardBorder}`,
//         }}
//       >
//         <TagIcon color={filled ? theme.textOnTint : theme.color} size={16} />
//         <span>{s}</span>
//       </span>
//     );
//   };


//   return (
//     <div
//       style={{
//         padding: 16,
//         color: TOKENS.text,
//         fontFamily: "Inter, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
//       }}
//     >
//       {/* Header */}
//       <div style={{ marginBottom: 12 }}>
//         <div style={{ fontSize: 18, fontWeight: 700 }}>
//           Configure "T-Shirt Size" Field
//         </div>
//         <div style={{ fontSize: 13, color: TOKENS.neutral600, marginTop: 4 }}>
//           Use T-shirt sizes to categorize and manage your requirements more effectively
//           {fieldDesc ? ` — ${fieldDesc}` : ""}
//         </div>
//       </div>


//       {/* Tabs */}
//       <div
//         role="tablist"
//         aria-label="Configuration tabs"
//         style={{
//           display: "flex",
//           gap: 20,
//           borderBottom: `1px solid ${TOKENS.neutral300}`,
//           marginBottom: 16,
//         }}
//       >
//         {["Configuration", "Edit Permissions"].map((tab) => {
//           const active = activeTab === tab;
//           return (
//             <button
//               key={tab}
//               role="tab"
//               aria-selected={active}
//               onClick={() => setActiveTab(tab)}
//               style={{
//                 appearance: "none",
//                 background: "transparent",
//                 border: "none",
//                 padding: "10px 4px",
//                 marginBottom: -1,
//                 fontWeight: 600,
//                 color: active ? TOKENS.primary : TOKENS.neutral600,
//                 borderBottom: `2px solid ${active ? TOKENS.primary : "transparent"}`,
//                 cursor: "pointer",
//               }}
//             >
//               {tab}
//             </button>
//           );
//         })}
//       </div>


//       {activeTab === "Configuration" ? (
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
//           {/* Left controls */}
//           <div>
//             {/* View */}
//             <div style={{ fontWeight: 700, marginBottom: 8 }}>View</div>
//             <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
//               <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <input
//                   type="radio"
//                   name="view-type"
//                   value="Filled"
//                   checked={viewType === "Filled"}
//                   onChange={() => setViewType("Filled")}
//                 />
//                 Filled
//               </label>
//               <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <input
//                   type="radio"
//                   name="view-type"
//                   value="Outlined"
//                   checked={viewType === "Outlined"}
//                   onChange={() => setViewType("Outlined")}
//                 />
//                 Outlined
//               </label>
//             </div>


//             {/* Color */}
//             <div style={{ fontWeight: 700, marginBottom: 8 }}>Color</div>
//             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//               {COLOR_PALETTE.map((c) => {
//                 const sel = c === color;
//                 return (
//                   <button
//                     key={c}
//                     title={c}
//                     onClick={() => setColor(c)}
//                     style={{
//                       width: 28,
//                       height: 28,
//                       borderRadius: 6,
//                       background: c,
//                       border: `2px solid ${sel ? TOKENS.neutral0 : "rgba(0,0,0,0.1)"}`,
//                       boxShadow: sel
//                         ? `0 0 0 2px ${c}, ${TOKENS.shadow}`
//                         : TOKENS.shadow,
//                       cursor: "pointer",
//                     }}
//                     aria-label={`Choose color ${c}`}
//                   />
//                 );
//               })}
//             </div>
//           </div>


//           {/* Right preview */}
//           <div
//             style={{
//               border: `1px solid ${TOKENS.neutral300}`,
//               borderRadius: 10,
//               background: TOKENS.neutral0,
//               boxShadow: TOKENS.shadow,
//               padding: 16,
//               maxHeight: 460,
//               overflow: "auto",
//             }}
//           >
//             <div style={{ fontWeight: 700, marginBottom: 10 }}>
//               Add available options for the current custom field
//             </div>


//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 12,
//               }}
//             >
//               {sizes.map((s) => {
//                 const filled = viewType === "Filled";
//                 return (
//                   <div
//                     key={s}
//                     style={{
//                       border: `2px solid ${filled ? theme.hardBorder : theme.hardBorder}`,
//                       background: filled ? TOKENS.neutral50 : TOKENS.neutral0,
//                       borderRadius: 12,
//                       padding: 12,
//                       minHeight: 78,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       gap: 8,
//                     }}
//                   >
//                     <LabelChip s={s} />
//                     {/* simple check visual */}
//                     <div
//                       title="Included"
//                       style={{
//                         width: 18,
//                         height: 18,
//                         borderRadius: "50%",
//                         border: `2px solid ${theme.hardBorder}`,
//                         background: filled ? theme.tint : "transparent",
//                       }}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Edit Permissions */
//         <div style={{ display: "grid", gap: 12 }}>
//           <label style={{ fontWeight: 700 }}>Select size</label>
//           <select
//             value={activeSize}
//             onChange={(e) => setActiveSize(e.target.value)}
//             style={{
//               width: 260,
//               padding: "8px 10px",
//               borderRadius: 8,
//               border: `1px solid ${TOKENS.neutral300}`,
//               background: TOKENS.neutral0,
//             }}
//           >
//             {sizes.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>


//           {/* Placeholder – wire to your actual selectors / pickers */}
//           <div
//             style={{
//               marginTop: 8,
//               border: `1px dashed ${TOKENS.neutral300}`,
//               borderRadius: 10,
//               padding: 16,
//               color: TOKENS.neutral600,
//               background: TOKENS.neutral100,
//             }}
//           >
//             Add your permissions UI here (chips, pickers, etc.). Current selection:{" "}
//             <b>{activeSize}</b>.
//             <div style={{ marginTop: 10, fontSize: 13 }}>
//               <button
//                 onClick={() =>
//                   setSelectedPermissions((prev) => ({
//                     ...prev,
//                     [activeSize]: {
//                       users: ["alice", "bob"],
//                       groups: ["jira-users"],
//                       roles: ["Developer"],
//                     },
//                   }))
//                 }
//                 style={{
//                   background: TOKENS.primary,
//                   color: "#fff",
//                   border: "none",
//                   padding: "6px 10px",
//                   borderRadius: 6,
//                   cursor: "pointer",
//                   fontWeight: 600,
//                 }}
//               >
//                 Quick-fill demo permissions
//               </button>
//             </div>
//           </div>
//         </div>
//       )}


//       {/* Footer */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
//         <div style={{ fontSize: 12, color: TOKENS.neutral600 }}>
//           Field: <b>{fieldName || "T-Shirt Size"}</b>
//         </div>
//         <div style={{ display: "flex", gap: 8 }}>
//           <button
//             onClick={onClose}
//             style={{
//               background: TOKENS.neutral100,
//               border: `1px solid ${TOKENS.neutral300}`,
//               padding: "8px 14px",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: 600,
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleNext}
//             style={{
//               background: TOKENS.primary,
//               color: "#fff",
//               border: "none",
//               padding: "8px 14px",
//               borderRadius: 8,
//               cursor: "pointer",
//               fontWeight: 600,
//               boxShadow: TOKENS.shadow,
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// export default TShirtSizeField;
















































import React, { useEffect, useMemo, useState } from "react";


/* ---------- Design tokens (Atlassian-ish) ---------- */
const TOKENS = {
  primary: "#0052CC",
  neutral0: "#FFFFFF",
  neutral50: "#FAFBFC",
  neutral100: "#F4F5F7",
  neutral200: "#EBECF0",
  neutral300: "#DFE1E6",
  neutral600: "#5E6C84",
  text: "#172B4D",
  shadow: "0 1px 2px rgba(9,30,66,.15)",
};


/* ---------- Helpers ---------- */
const hexToRgba = (hex, alpha = 0.12) => {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


/* ---------- Label Tag Icon ---------- */
const TagIcon = ({ color = "#FF5630", size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.59 13.41l-7.99 7.99a2 2 0 0 1-2.83 0l-7.17-7.17a2 2 0 0 1-.58-1.41V5a2 2 0 0 1 2-2h7.82c.53 0 1.04.21 1.41.59l7.99 7.99a2 2 0 0 1 0 2.83zM7.5 8A1.5 1.5 0 1 0 7.5 5a1.5 1.5 0 0 0 0 3z"
      fill={color}
    />
  </svg>
);


/* ---------- Defaults ---------- */
const DEFAULT_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
const COLOR_PALETTE = [
  "#DE350B", // red (Atlassian-ish)
  "#FF8B00", // orange
  "#36B37E", // green
  "#00A3BF", // teal
  "#00B8D9", // cyan
  "#2684FF", // blue
  "#6554C0", // purple
  "#5243AA", // indigo
  "#A5ADBA", // gray
];


/* ---------- Component ---------- */
function TShirtSizeField({
  onNext = () => {},
  onClose = () => {},
  fieldName = "",
  fieldDesc = "",
  sizes = DEFAULT_SIZES,
}) {
  const [activeTab, setActiveTab] = useState("Configuration");
  const [viewType, setViewType] = useState("Filled"); // "Filled" | "Outlined"
  const [color, setColor] = useState(COLOR_PALETTE[0]);
  const [activeSize, setActiveSize] = useState(sizes[0] || "M");


  // permissions per size
  const [selectedPermissions, setSelectedPermissions] = useState(
    sizes.reduce((acc, s) => {
      acc[s] = { users: [], groups: [], roles: [] };
      return acc;
    }, {})
  );


  // derived styling from chosen color
  const theme = useMemo(
    () => ({
      color,
      tint: hexToRgba(color, 0.12),
      border: hexToRgba(color, 0.4),
      hardBorder: color,
      textOnTint: color,
    }),
    [color]
  );


  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("T-Shirt size permissions:", selectedPermissions);
  }, [selectedPermissions]);


  const handleNext = () => {
    const fieldData = {
      name: fieldName,
      type: "T-Shirt Size",
      usage: "0 issues",
      description: fieldDesc,
      view: viewType,
      color,
      permissions: selectedPermissions,
      options: sizes,
    };
    // eslint-disable-next-line no-console
    console.log("Final T-Shirt Field Data:", fieldData);
    onNext(fieldData);
  };


  const LabelChip = ({ s }) => {
    const filled = viewType === "Filled";
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 700,
          padding: "6px 10px",
          borderRadius: 999,
          background: filled ? theme.tint : TOKENS.neutral0,
          color: filled ? theme.textOnTint : theme.color,
          border: `1px solid ${filled ? theme.border : theme.hardBorder}`,
        }}
      >
        <TagIcon color={filled ? theme.textOnTint : theme.color} size={16} />
        <span>{s}</span>
      </span>
    );
  };


  return (
    <div
      style={{
        padding: 16,
        color: TOKENS.text,
        fontFamily: "Inter, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          Configure "T-Shirt Size" Field
        </div>
        <div style={{ fontSize: 13, color: TOKENS.neutral600, marginTop: 4 }}>
          Use T-shirt sizes to categorize and manage your requirements more effectively
          {fieldDesc ? ` — ${fieldDesc}` : ""}
        </div>
      </div>


      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Configuration tabs"
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
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab)}
              style={{
                appearance: "none",
                background: "transparent",
                border: "none",
                padding: "10px 4px",
                marginBottom: -1,
                fontWeight: 600,
                color: active ? TOKENS.primary : TOKENS.neutral600,
                borderBottom: `2px solid ${active ? TOKENS.primary : "transparent"}`,
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>


      {activeTab === "Configuration" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Left controls */}
          <div>
            {/* View */}
            <div style={{ fontWeight: 700, marginBottom: 8 }}>View</div>
            <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="view-type"
                  value="Filled"
                  checked={viewType === "Filled"}
                  onChange={() => setViewType("Filled")}
                />
                Filled
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  name="view-type"
                  value="Outlined"
                  checked={viewType === "Outlined"}
                  onChange={() => setViewType("Outlined")}
                />
                Outlined
              </label>
            </div>


            {/* Color */}
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Color</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {COLOR_PALETTE.map((c) => {
                const sel = c === color;
                return (
                  <button
                    key={c}
                    title={c}
                    onClick={() => setColor(c)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: c,
                      border: `2px solid ${sel ? TOKENS.neutral0 : "rgba(0,0,0,0.1)"}`,
                      boxShadow: sel
                        ? `0 0 0 2px ${c}, ${TOKENS.shadow}`
                        : TOKENS.shadow,
                      cursor: "pointer",
                    }}
                    aria-label={`Choose color ${c}`}
                  />
                );
              })}
            </div>
          </div>


          {/* Right preview */}
          <div
            style={{
              border: `1px solid ${TOKENS.neutral300}`,
              borderRadius: 10,
              background: TOKENS.neutral0,
              boxShadow: TOKENS.shadow,
              padding: 16,
              maxHeight: 460,
              overflow: "auto",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10 }}>
              Add available options for the current custom field
            </div>


            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {sizes.map((s) => {
                const filled = viewType === "Filled";
                return (
                  <div
                    key={s}
                    style={{
                      border: `2px solid ${filled ? theme.hardBorder : theme.hardBorder}`,
                      background: filled ? TOKENS.neutral50 : TOKENS.neutral0,
                      borderRadius: 12,
                      padding: 12,
                      minHeight: 78,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <LabelChip s={s} />
                    {/* simple check visual */}
                    <div
                      title="Included"
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: `2px solid ${theme.hardBorder}`,
                        background: filled ? theme.tint : "transparent",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Edit Permissions */
        <div style={{ display: "grid", gap: 12 }}>
          <label style={{ fontWeight: 700 }}>Select size</label>
          <select
            value={activeSize}
            onChange={(e) => setActiveSize(e.target.value)}
            style={{
              width: 260,
              padding: "8px 10px",
              borderRadius: 8,
              border: `1px solid ${TOKENS.neutral300}`,
              background: TOKENS.neutral0,
            }}
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>


          {/* Placeholder – wire to your actual selectors / pickers */}
          <div
            style={{
              marginTop: 8,
              border: `1px dashed ${TOKENS.neutral300}`,
              borderRadius: 10,
              padding: 16,
              color: TOKENS.neutral600,
              background: TOKENS.neutral100,
            }}
          >
            Add your permissions UI here (chips, pickers, etc.). Current selection:{" "}
            <b>{activeSize}</b>.
            <div style={{ marginTop: 10, fontSize: 13 }}>
              <button
                onClick={() =>
                  setSelectedPermissions((prev) => ({
                    ...prev,
                    [activeSize]: {
                      users: ["alice", "bob"],
                      groups: ["jira-users"],
                      roles: ["Developer"],
                    },
                  }))
                }
                style={{
                  background: TOKENS.primary,
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Quick-fill demo permissions
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <div style={{ fontSize: 12, color: TOKENS.neutral600 }}>
          Field: <b>{fieldName || "T-Shirt Size"}</b>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
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
    </div>
  );
}


export default TShirtSizeField;