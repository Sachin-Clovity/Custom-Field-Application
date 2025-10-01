import React, { useState } from "react";

function ModalCustomField({ onClose, onSelect }) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [step, setStep] = useState(1); // step 1 = choose template, step 2 = configure
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [fieldDesc, setFieldDesc] = useState("");

  const tabs = ["All", "Number", "Progress", "Picker", "Prioritization", "Other"];

  const fieldTypes = [
    { name: "Shoppie", desc: "Shopping Experience in JSM", category: "Number" },
    { name: "Linksy", desc: "Effortless Linking in Jira", category: "Picker" },
    { name: "MoSCoW Prioritization", desc: "Prioritize using MoSCoW categories", category: "Prioritization" },
    { name: "Progress Tracker", desc: "Track issue progress visually", category: "Progress" },
    { name: "Custom Number", desc: "Custom number input field", category: "Number" },
    { name: "Other Field", desc: "Special custom field", category: "Other" }
  ];

  const filteredFields = fieldTypes.filter(
    (f) =>
      (activeTab === "All" || f.category === activeTab) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setStep(2);
  };

  const handleNext = () => {
    if (!fieldName.trim()) {
      alert("Please enter a field name.");
      return;
    }
    onSelect({
      name: fieldName,
      type: selectedTemplate.name,
      usage: "0 issues",
      description: fieldDesc
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "800px",
          maxHeight: "90vh",
          borderRadius: "8px",
          padding: "20px",
          overflowY: "auto"
        }}
      >
        {step === 1 && (
          <>
            {/* Header */}
            <h2>Create Custom Field</h2>
            <p>Please select the custom field type you want to add.</p>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "10px", margin: "15px 0", flexWrap: "wrap" }}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: activeTab === tab ? "2px solid #0052cc" : "1px solid #ccc",
                    background: activeTab === tab ? "#e9f2ff" : "#f4f5f7",
                    cursor: "pointer"
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search field types..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                marginBottom: "15px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%"
              }}
            />

            {/* Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
              {filteredFields.map((f, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "15px",
                    background: "#fafafa"
                  }}
                >
                  <h4 style={{ margin: "0 0 10px" }}>{f.name}</h4>
                  <p style={{ fontSize: "13px", color: "#555" }}>{f.desc}</p>
                  <button
                    style={{
                      marginTop: "10px",
                      background: "#0052cc",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                    onClick={() => handleSelectTemplate(f)}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
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
            </div>
          </>
        )}

        {step === 2 && selectedTemplate && (
          <>
            {/* Configure Field */}
            <h2>Configure "{selectedTemplate.name}" Field</h2>
            <p>
              The name and a short description of your new custom field.  
              The description helps to understand the purpose of this field and will be displayed in the field overview.
            </p>

            {/* Form */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                Name*
              </label>
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

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                Description
              </label>
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

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
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
                onClick={() => setStep(1)}
                style={{
                  background: "#f4f5f7",
                  border: "1px solid #ccc",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Back
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
          </>
        )}
      </div>
    </div>
  );
}

export default ModalCustomField;
