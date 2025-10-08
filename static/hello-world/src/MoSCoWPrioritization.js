import React, { useState, useEffect } from "react";
// import PermissionsConfiguration from "./PermissionConfiguration";

// Import SVGs as React components
import { ReactComponent as MIcon } from "./images/K.svg";
import { ReactComponent as SIcon } from "./images/K.svg";
import { ReactComponent as CIcon } from "./images/K.svg";
import { ReactComponent as WIcon } from "./images/K.svg";

// Define MoSCoW constants
const MOSCOW_KEYS = ["M", "S", "C", "W"];
const MOSCOW_WORDS = { M: "MUST", S: "SHOULD", C: "COULD", W: "WOULD" };
const MOSCOW_COLORS = { M: "#36b37e", S: "#00b8d9", C: "#ffab00", W: "#ff5630" };

// Map keys to imported SVG components
const MOSCOW_ICONS = { M: MIcon, S: SIcon, C: CIcon, W: WIcon };

function MoSCoWPrioritization({ onNext, onClose, fieldName, fieldDesc }) {
  const [activeTab, setActiveTab] = useState("Configuration");
  const [viewType, setViewType] = useState("Labeled");
  const [activeCategory, setActiveCategory] = useState("M");

  const [selectedPermissions, setSelectedPermissions] = useState({
    M: { users: [], groups: [], roles: [] },
    S: { users: [], groups: [], roles: [] },
    C: { users: [], groups: [], roles: [] },
    W: { users: [], groups: [], roles: [] },
  });

  // MoSCoW data array (used for rendering)
  const MOSCOW = MOSCOW_KEYS.map((key) => ({
    key,
    word: MOSCOW_WORDS[key],
    bg: MOSCOW_COLORS[key],
    Icon: MOSCOW_ICONS[key],
  }));

  useEffect(() => {
    console.log("Parent selectedPermissions updated:", selectedPermissions);
  }, [selectedPermissions]);

  const handleNext = () => {
    const fieldData = {
      name: fieldName,
      type: "MoSCoW Prioritization",
      usage: "0 issues",
      description: fieldDesc,
      view: viewType,
      permissions: selectedPermissions,
      // icons: MOSCOW_KEYS.reduce((acc, key) => {
      //   acc[key] = K.svg; // or actual file name
      //   return acc;
      // }, {}),
    };
    console.log("Final MoSCoW Field Data:", fieldData);
    onNext(fieldData);
  };

  return (
    <div style={{ padding: "10px" }}>
      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #ccc", marginBottom: "15px", display: "flex" }}>
        {["Configuration", "Edit Permissions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              border: "none",
              background: "transparent",
              padding: "8px 16px",
              fontWeight: "bold",
              borderBottom: activeTab === tab ? "2px solid #0052cc" : "2px solid transparent",
              cursor: "pointer",
              color: activeTab === tab ? "#0052cc" : "#555",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Configuration Tab */}
      {activeTab === "Configuration" && (
        <div style={{ display: "flex", gap: "30px" }}>
          {/* Left Side */}
          <div style={{ flex: 1 }}>
            <h3>Use MoSCoW categories to prioritize and understand business value</h3>
            <div style={{ marginTop: "20px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>View</label>
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  value="Shortened"
                  checked={viewType === "Shortened"}
                  onChange={(e) => setViewType(e.target.value)}
                />{" "}
                Shortened
              </label>
              <label>
                <input
                  type="radio"
                  value="Labeled"
                  checked={viewType === "Labeled"}
                  onChange={(e) => setViewType(e.target.value)}
                />{" "}
                Labeled
              </label>
            </div>
          </div>

          {/* Right Side Preview */}
          <div
            style={{
              flex: 1,
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              background: "#fafafa",
            }}
          >
            <h4 style={{ marginBottom: "10px" }}>Preview</h4>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              {MOSCOW.map((m) => {
                const perms = selectedPermissions[m.key] || { users: [], groups: [], roles: [] };
                const Icon = m.Icon;
                return (
                  <div
                    key={m.key}
                    style={{
                      border: `1px solid ${m.bg}`,
                      borderRadius: "8px",
                      padding: "8px",
                      background: "#fff",
                    }}
                  >
                    {/* SVG Icon */}
                    <Icon width={40} height={40} style={{ marginBottom: "6px" }} />

                    {/* Category Label */}
                    <div
                      style={{
                        background: m.bg,
                        color: "#fff",
                        padding: "6px 10px",
                        borderRadius: "16px",
                        fontWeight: "bold",
                        display: "inline-block",
                        marginBottom: "6px",
                      }}
                    >
                      {m.key} {viewType === "Labeled" && m.word}
                    </div>

                    {/* Permissions */}
                    <div style={{ fontSize: "13px", color: "#333" }}>
                      {perms.users?.length > 0 && <div><strong>Users:</strong> {perms.users.join(", ")}</div>}
                      {perms.groups?.length > 0 && <div><strong>Groups:</strong> {perms.groups.join(", ")}</div>}
                      {perms.roles?.length > 0 && <div><strong>Roles:</strong> {perms.roles.join(", ")}</div>}
                      {perms.users?.length === 0 && perms.groups?.length === 0 && perms.roles?.length === 0 && (
                        <div style={{ color: "#999" }}>No permissions assigned</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Edit Permissions Tab */}
      {activeTab === "Edit Permissions" && (
        <div>
          <label style={{ marginBottom: "8px", display: "block", fontWeight: "bold" }}>
            Select MoSCoW Category:
          </label>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            style={{ marginBottom: "15px", padding: "6px", borderRadius: "4px" }}
          >
            {MOSCOW.map((m) => (
              <option key={m.key} value={m.key}>
                {m.word}
              </option>
            ))}
          </select>

          {/* <PermissionsConfiguration
            selectedPermissions={selectedPermissions[activeCategory]}
            setSelectedPermissions={(updated) => {
              console.log(Updating permissions for category ${activeCategory}:, updated);
              setSelectedPermissions((prev) => ({
                ...prev,
                [activeCategory]: {
                  users: updated.users || [],
                  groups: updated.groups || [],
                  roles: updated.roles || [],
                },
              }));
            }}
          /> */}
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px" }}>
        <button
          onClick={onClose}
          style={{
            background: "#f4f5f7",
            border: "1px solid #ccc",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
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
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MoSCoWPrioritization;