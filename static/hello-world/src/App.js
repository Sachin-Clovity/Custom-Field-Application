import React, { useState } from "react";
import ModalCustomField from "./ModalCustomField";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState([
    { name: "countrypick", type: "Country Picker", usage: "1 issue" },
    { name: "jirafilter", type: "Jira Filters Picker", usage: "1 issue" },
    { name: "singlerfield", type: "Select Picker (single)", usage: "1 issue" },
    { name: "abbrevi", type: "Abbreviate Numbers", usage: "1 issue" },
    { name: "price", type: "Currency (Price)", usage: "1 issue" }
  ]);
  const [search, setSearch] = useState("");

  // Add new field from modal
  const handleAddField = (newField) => {
    setFields([...fields, newField]);
    setIsModalOpen(false);
  };

  const filteredFields = fields.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Banner */}
      <div
        style={{
          background: "#ffe2e2",
          color: "#a00",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px"
        }}
      >
        ⚠ Some fields are being deprecated: Issue Update, JQL Filter Fields, etc.
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}
      >
        <h2 style={{ margin: 0 }}>Custom Fields</h2>
        <button
          style={{
            background: "#0052cc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            cursor: "pointer"
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Create custom field
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search fields..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "250px"
        }}
      />

      {/* Fields Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff"
        }}
      >
        <thead>
          <tr style={{ background: "#f4f5f7", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
              Name
            </th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
              Type
            </th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
              Usage
            </th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredFields.map((field, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{field.name}</td>
              <td style={{ padding: "10px" }}>{field.type}</td>
              <td style={{ padding: "10px" }}>{field.usage}</td>
              <td style={{ padding: "10px" }}>
                <button style={{ marginRight: "10px" }}>✏ Edit</button>
                <button style={{ color: "red" }}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <ModalCustomField onClose={() => setIsModalOpen(false)} onSelect={handleAddField} />
      )}
    </div>
  );
}

export default App;