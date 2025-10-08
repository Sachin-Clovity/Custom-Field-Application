import React, { useState, useEffect } from "react";
import { invoke } from "@forge/bridge";

function PermissionConfiguration({ selectedPermissions, setSelectedPermissions }) {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, g, r] = await Promise.all([
          invoke("getUsers"),
          invoke("getGroups"),
          invoke("getRoles"),
        ]);

        setUsers(Array.isArray(u) ? u : []);
        setGroups(Array.isArray(g) ? g : []);
        setRoles(Array.isArray(r) ? r : []);
      } catch (err) {
        console.error("❌ Failed to load permission data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

const handleSelect = (type, value) => {
  const newPerms = {
    ...selectedPermissions,
    [type]: value ? [value] : [],
  };
  console.log("Updated permissions:", newPerms);
  setSelectedPermissions(newPerms);
};



  if (loading) return <p>Loading permissions...</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Info Message */}
      <div
        style={{
          background: "#e9f2ff",
          border: "1px solid #b3d4ff",
          borderRadius: "6px",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        <strong>ℹ️ Info: </strong>
        Leave this section empty if you want the field to be editable by everyone.
        Adding restrictions here will limit editing permissions to specific users, groups, or roles.
      </div>

      {/* User Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "6px" }}>Users</label>
        <select
          value={selectedPermissions.users[0] || ""}
          onChange={(e) => handleSelect("users", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        >
          <option value="">Select users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Group Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "6px" }}>Groups</label>
        <select
          value={selectedPermissions.groups[0] || ""}
          onChange={(e) => handleSelect("groups", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        >
          <option value="">Select groups</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {/* Roles Dropdown */}
      <div>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "6px" }}>Project Roles</label>
        <select
          value={selectedPermissions.roles[0] || ""}
          onChange={(e) => handleSelect("roles", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        >
          <option value="">Select project roles</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PermissionConfiguration;
