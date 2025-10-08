import api, { route, storage } from "@forge/api";
import Resolver from "@forge/resolver";

const resolver = new Resolver();

// Fetch Jira screens with pagination
resolver.define("getScreens", async () => {
  let startAt = 0;
  let allScreens = [];
  
  try {
    while (true) {
      const res = await api.asApp().requestJira(route`/rest/api/3/screens?startAt=${startAt}&maxResults=50`);
      if (!res.ok) {
        const errText = await res.text();
        console.error(`❌ Failed to fetch screens: ${errText}`);
        throw new Error("Could not fetch screens");
      }

      const data = await res.json();
      if (data.values) {
        allScreens = [...allScreens, ...data.values];
      }

      if (data.isLast || !data.values?.length) break;
      startAt += 50;
    }

    console.log(`📊 [Backend] Total screens fetched: ${allScreens.length}`);
    return allScreens.map((s) => ({ id: s.id, name: s.name }));
  } catch (err) {
    console.error("❌ Error fetching screens:", err);
    throw new Error("Error fetching screens.");
  }
});

// Create custom field in Jira & store metadata in Forge Storage
resolver.define("createCustomField", async ({ payload }) => {
  const { name, description, type, config } = payload;
  console.log("🚀 [Backend] Creating custom field:", { name, description, type, config });

  try {
    const res = await api.asApp().requestJira(route`/rest/api/3/field`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        type: "com.atlassian.jira.plugin.system.customfieldtypes:select", // Assumed field type, adjust if necessary
        searcherKey: "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher",
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`❌ Failed to create custom field: ${errText}`);
      throw new Error("Failed to create custom field.");
    }

    const field = await res.json();

    // Store metadata in Forge storage
    await storage.set(`customField:${field.id}`, {
      id: field.id,
      name,
      description,
      type,
      config,
      createdAt: new Date().toISOString(),
    });

    console.log("✅ [Backend] Stored custom field in Forge storage:", field.id);
    return field;
  } catch (err) {
    console.error("❌ Error creating custom field:", err);
    throw new Error("Error creating custom field.");
  }
});

// Associate custom field to selected screens
resolver.define("associateFieldToScreens", async ({ payload }) => {
  const { customFieldId, screens } = payload;
  console.log("🔗 [Backend] Associating field", customFieldId, "to screens:", screens);

  const results = [];

  try {
    // Check screens and associate field to each
    for (const screenId of screens) {
      try {
        const tabsRes = await api.asApp().requestJira(route`/rest/api/3/screens/${screenId}/tabs`);

        if (!tabsRes.ok) {
          const errText = await tabsRes.text();
          console.error(`❌ Failed tabs fetch for screen ${screenId}: ${errText}`);
          results.push({ screenId, success: false, error: errText });
          continue;
        }

        const tabs = await tabsRes.json();
        const firstTabId = tabs[0]?.id;
        if (!firstTabId) {
          results.push({ screenId, success: false, error: "No tabs available" });
          continue;
        }

        const addRes = await api.asApp().requestJira(
          route`/rest/api/3/screens/${screenId}/tabs/${firstTabId}/fields`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fieldId: customFieldId }),
          }
        );

        if (!addRes.ok) {
          const errText = await addRes.text();
          console.error(`❌ Failed field add for screen ${screenId}: ${errText}`);
          results.push({ screenId, success: false, error: errText });
          continue;
        }

        results.push({ screenId, success: true });
      } catch (err) {
        results.push({ screenId, success: false, error: err.message });
      }
    }

    console.log("📊 [Backend] Association results:", results);
    return { success: results.every((r) => r.success), results };
  } catch (err) {
    console.error("❌ Error associating field to screens:", err);
    return { success: false, error: err.message };
  }
});

// Set permissions for custom field
resolver.define("setFieldPermissions", async ({ payload }) => {
  const { customFieldId, users, groups, roles } = payload;
  console.log("🔒 [Backend] Setting permissions for field", customFieldId);

  try {
    const permissionData = {
      users,
      groups,
      roles,
    };

    const res = await api.asApp().requestJira(route`/rest/api/3/customField/${customFieldId}/permissions`, {
      method: "POST",
      body: JSON.stringify(permissionData),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`❌ Failed to set permissions for field ${customFieldId}: ${errText}`);
      throw new Error("Failed to set field permissions.");
    }

    console.log("✅ [Backend] Permissions set for field:", customFieldId);
    return { success: true };
  } catch (err) {
    console.error("❌ Error setting permissions:", err);
    return { success: false, error: err.message };
  }
});

/**
 * Fetch available Jira users (limited to 50 for demo)
 */
/**
 * ✅ Get Jira Users
 */
// ✅ Fetch users
resolver.define("getUsers", async () => {
  try {
    const res = await api.asApp().requestJira(route`/rest/api/3/users/search?maxResults=20`);
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map(u => ({ id: u.accountId, name: u.displayName }));
  } catch (err) {
    console.error("❌ [Backend] getUsers failed:", err);
    return [];
  }
});

// ✅ Fetch groups
resolver.define("getGroups", async () => {
  try {
    const res = await api.asApp().requestJira(route`/rest/api/3/group/bulk`);
    const data = await res.json();
    if (!data?.values) return [];
    return data.values.map(g => ({ id: g.groupId || g.name, name: g.name }));
  } catch (err) {
    console.error("❌ [Backend] getGroups failed:", err);
    return [];
  }
});

// ✅ Fetch roles
resolver.define("getRoles", async () => {
  try {
    const res = await api.asApp().requestJira(route`/rest/api/3/role`);
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map(r => ({ id: r.id, name: r.name }));
  } catch (err) {
    console.error("❌ [Backend] getRoles failed:", err);
    return [];
  }
});

export const handler = resolver.getDefinitions();
