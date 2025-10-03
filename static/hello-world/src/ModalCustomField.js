import React, { useState } from "react";
import { invoke } from "@forge/bridge";   // ✅ Forge bridge
import MoSCoWPrioritization from "./MoSCoWPrioritization";
import ScreenAssociation from "./ScreenAssociation";

function ModalCustomField({ onClose, onSelect }) {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [step, setStep] = useState(1); // 1=template, 2=name/desc, 3=config, 4=screen association
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [fieldDesc, setFieldDesc] = useState("");
  const [configData, setConfigData] = useState(null);

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

  const handleStep2Next = () => {
    if (!fieldName.trim()) {
      alert("Please enter a field name.");
      return;
    }
    setStep(3);
  };

  const handleTemplateConfigNext = async (data) => {
    try {
      console.log("🚀 [Frontend] Creating custom field with:", {
        name: fieldName,
        description: fieldDesc,
        template: selectedTemplate.name,
        config: data,
      });

      const created = await invoke("createCustomField", {
        name: fieldName,
        description: fieldDesc,
        template: selectedTemplate.name,
        config: data,
      });

      if (!created || !created.id) {
        throw new Error("Backend did not return a valid field ID");
      }

      console.log("✅ [Frontend] Field created:", created);

      setConfigData({ ...data, customFieldId: created.id });
      setStep(4);
    } catch (err) {
      console.error("❌ [Frontend] Error creating field:", err);
      alert(`Failed to create field: ${err.message || JSON.stringify(err)}`);
    }
  };

  const handleFinalSelect = (screens) => {
    onSelect({
      name: fieldName,
      type: selectedTemplate.name,
      usage: "0 issues",
      description: fieldDesc,
      config: configData,
      screens,
    });
    onClose?.();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#fff",
        width: "800px",
        maxHeight: "90vh",
        borderRadius: "8px",
        padding: "20px",
        overflowY: "auto",
      }}>
        {step === 1 && (
          <>
            <h2>Create Custom Field</h2>
            <p>Please select the custom field type you want to add.</p>

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
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

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
                width: "100%",
              }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
              {filteredFields.map((f, i) => (
                <div key={i} style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "15px",
                  background: "#fafafa",
                }}>
                  <h4>{f.name}</h4>
                  <p style={{ fontSize: "13px", color: "#555" }}>{f.desc}</p>
                  <button
                    style={{
                      marginTop: "10px",
                      background: "#0052cc",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                    }}
                    onClick={() => handleSelectTemplate(f)}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && selectedTemplate && (
          <>
            <h2>Configure "{selectedTemplate.name}" Field</h2>
            <p>The name and description help to identify your custom field.</p>

            <div>
              <label>Field Name*</label>
              <input
                type="text"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
              />
            </div>

            <div>
              <label>Description</label>
              <input
                type="text"
                value={fieldDesc}
                onChange={(e) => setFieldDesc(e.target.value)}
              />
            </div>

            <div>
              <button onClick={onClose}>Cancel</button>
              <button onClick={() => setStep(1)}>Back</button>
              <button onClick={handleStep2Next}>Next</button>
            </div>
          </>
        )}

        {step === 3 && selectedTemplate?.name === "MoSCoW Prioritization" && (
          <MoSCoWPrioritization
            onNext={handleTemplateConfigNext}
            onClose={onClose}
            fieldName={fieldName}
            fieldDesc={fieldDesc}
          />
        )}

        {step === 4 && (
          <ScreenAssociation
            customFieldId={configData?.customFieldId}
            onBack={() => setStep(3)}
            onCreate={handleFinalSelect}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

export default ModalCustomField;
