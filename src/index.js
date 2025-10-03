import api, { route, storage } from "@forge/api";
import Resolver from "@forge/resolver";

const resolver = new Resolver();

/**
 * Fetch Jira screens with pagination
 */
resolver.define("getScreens", async () => {
  let startAt = 0;
  let allScreens = [];

  while (true) {
    const res = await api.asApp().requestJira(
      route`/rest/api/3/screens?startAt=${startAt}&maxResults=50`
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ Failed to fetch screens:", errText);
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
});

/**
 * Create custom field in Jira & store metadata in Forge Storage
 */
resolver.define("createCustomField", async ({ payload }) => {
  const { name, description, type, config } = payload;
  console.log("🚀 [Backend] Creating custom field:", payload);

  const res = await api.asApp().requestJira(route`/rest/api/3/field`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      type: "com.atlassian.jira.plugin.system.customfieldtypes:select",
      searcherKey: "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Failed to create custom field:", errText);
    throw new Error(errText);
  }

  const field = await res.json();

  //this data are stored in the forge storage

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
});

/**
 * Associate custom field to selected screens
 */
resolver.define("associateFieldToScreens", async ({ payload }) => {
  const { customFieldId, screens } = payload;
  console.log("🔗 [Backend] Associating field", customFieldId, "to screens:", screens);

  const results = [];

  for (const screenId of screens) {
    try {
      const tabsRes = await api.asApp().requestJira(route`/rest/api/3/screens/${screenId}/tabs`);

      if (!tabsRes.ok) {
        const errText = await tabsRes.text();
        console.error(`❌ Failed tabs fetch for screen ${screenId}:`, errText);
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
        console.error(`❌ Failed field add for screen ${screenId}:`, errText);
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
});

export const handler = resolver.getDefinitions();
