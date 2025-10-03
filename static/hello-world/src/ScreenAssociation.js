import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

function ScreenAssociation({ customFieldId, onBack, onClose }) {
  const [screens, setScreens] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const res = await invoke("getScreens");
        setScreens(res);
      } catch (err) {
        console.error("❌ Error fetching screens:", err);
      }
    };
    fetchScreens();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (selected.length === 0) {
      alert("Please select at least one screen.");
      return;
    }

    try {
      const res = await invoke("associateFieldToScreens", {
        customFieldId,
        screens: selected,
      });
      setResults(res.results);

      if (res.success) {
        alert("✅ Field mapped to all selected screens!");
      } else {
        alert("⚠ Some mappings failed. Check table for details.");
      }
    } catch (err) {
      console.error("❌ Error associating field:", err);
      alert("Unexpected error occurred.");
    }
  };

  const filteredScreens = screens.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Associate field to screens</h2>
      <p>Select the screens where this field should be visible:</p>

      <input
        type="text"
        placeholder="Search screens..."
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

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f4f5f7" }}>
            <th style={{ padding: "10px" }}>Select</th>
            <th style={{ padding: "10px" }}>Screen</th>
            <th style={{ padding: "10px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredScreens.length > 0 ? (
            filteredScreens.map((s) => {
              const status = results?.find((r) => r.screenId === s.id);
              return (
                <tr key={s.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>
                    <input
                      type="checkbox"
                      checked={selected.includes(s.id)}
                      onChange={() => toggleSelect(s.id)}
                    />
                  </td>
                  <td style={{ padding: "10px" }}>{s.name}</td>
                  <td style={{ padding: "10px" }}>
                    {status
                      ? status.success
                        ? "✅ Mapped"
                        : `❌ ${status.error}`
                      : "-"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3} style={{ padding: "10px", textAlign: "center" }}>
                ⚠ No screens found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button onClick={onClose}>Cancel</button>
        <button onClick={onBack}>Back</button>
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default ScreenAssociation;
