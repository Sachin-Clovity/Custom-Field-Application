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
// resolver.define("createCustomField", async ({ payload }) => {
//   const { name, description, type, config } = payload;
//   console.log("🚀 [Backend] Creating custom field:", payload);

//   const res = await api.asApp().requestJira(route`/rest/api/3/field`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name,
//       description,
//       type: "com.atlassian.jira.plugin.system.customfieldtypes:select",
//       searcherKey: "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher",
//     }),
//   });

//   if (!res.ok) {
//     const errText = await res.text();
//     console.error("❌ Failed to create custom field:", errText);
//     throw new Error(errText);
//   }

//   const field = await res.json();

//   //this data are stored in the forge storage

//   await storage.set(`customField:${field.id}`, {
//     id: field.id,
//     name,
//     description,
//     type,
//     config,
//     createdAt: new Date().toISOString(),
//   });

//   console.log("✅ [Backend] Stored custom field in Forge storage:", field.id);

//    // Step 3: Define the options you want to add to the select field
//   const predefinedOptions = ["Must", "Should", "Could", "But"];

//   // Step 4: Add the predefined options to the select field
//   for (const option of predefinedOptions) {
//     const optionRes = await api.asUser().requestJira(route`/rest/api/3/customField/${field.id}/option`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         value: option, // The value of the option to be added
//       }),
//     });

//     if (!optionRes.ok) {
//       const errText = await optionRes.text();
//       console.error(`❌ Failed to add option "${option}" to custom field ${field.id}:`, errText);
//     } else {
//       const optionData = await optionRes.json();
//       console.log(`✅ Option "${optionData.value}" added to field ${field.id}`);
//     }
//   }


//   return field;
// });










// this is working for custome field with dropdown option 

resolver.define("createCustomField", async ({ payload }) => {
  const { name, description, type, config } = payload;
  console.log("🚀 [Backend] Creating custom field:", payload);

  // Step 1: Create the custom field
  const res = await api.asApp().requestJira(route`/rest/api/3/field`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      type: "com.atlassian.jira.plugin.system.customfieldtypes:select",
      searcherKey:
        "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Failed to create custom field:", errText);
    throw new Error(errText);
  }

  const field = await res.json();

  // Step 2: Store field metadata in Forge storage
  await storage.set(`customField:${field.id}`, {
    id: field.id,
    name,
    description,
    type,
    config,
    createdAt: new Date().toISOString(),
  });
  console.log("✅ [Backend] Stored custom field in Forge storage:", field.id);

  // Step 3: Get the default context (Jira creates one automatically)
  const contextsRes = await api.asApp().requestJira(
    route`/rest/api/3/field/${field.id}/context`
  );

  if (!contextsRes.ok) {
    const errText = await contextsRes.text();
    console.error("❌ Failed to fetch contexts for field:", errText);
    throw new Error(errText);
  }

  const contexts = await contextsRes.json();
  if (!contexts.values || contexts.values.length === 0) {
    throw new Error(`⚠️ No contexts found for field ${field.id}`);
  }

  const contextId = contexts.values[0].id; // use the existing default context
  console.log(`✅ Using context ${contextId} for field ${field.id}`);

  // Step 4: Add predefined options to the field context
  const predefinedOptions = ["Must", "Should", "Could", "Would"];

  const optionsRes = await api.asApp().requestJira(
    route`/rest/api/3/field/${field.id}/context/${contextId}/option`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        options: predefinedOptions.map((value) => ({ value })),
      }),
    }
  );

  if (!optionsRes.ok) {
    const errText = await optionsRes.text();
    console.error(
      `❌ Failed to add options to custom field ${field.id}:`,
      errText
    );
  } else {
    const options = await optionsRes.json();
    console.log(`✅ Options added to field ${field.id}:`, options.values);
  }

  return field;
});









// resolver.define("createCustomField", async ({ payload }) => {
//   const { name, description, type, config } = payload;
//   console.log("🚀 [Backend] Creating custom field:", payload);

//   // Step 1: Create the custom field
//   const res = await api.asApp().requestJira(route`/rest/api/3/field`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name,
//       description,
//       type: "com.atlassian.jira.plugin.system.customfieldtypes:select",
//       searcherKey:
//         "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher",
//     }),
//   });

//   if (!res.ok) {
//     const errText = await res.text();
//     console.error("❌ Failed to create custom field:", errText);
//     throw new Error(errText);
//   }

//   const field = await res.json();

//   // Step 2: Store field metadata in Forge storage
//   await storage.set(`customField:${field.id}`, {
//     id: field.id,
//     name,
//     description,
//     type,
//     config,
//     createdAt: new Date().toISOString(),
//   });
//   console.log("✅ [Backend] Stored custom field in Forge storage:", field.id);

//   // Step 3: Get the default context (Jira creates one automatically)
//   const contextsRes = await api.asApp().requestJira(
//     route`/rest/api/3/field/${field.id}/context`
//   );

//   if (!contextsRes.ok) {
//     const errText = await contextsRes.text();
//     console.error("❌ Failed to fetch contexts for field:", errText);
//     throw new Error(errText);
//   }

//   const contexts = await contextsRes.json();
//   if (!contexts.values || contexts.values.length === 0) {
//     throw new Error(`⚠️ No contexts found for field ${field.id}`);
//   }

//   const contextId = contexts.values[0].id; // use the existing default context
//   console.log(`✅ Using context ${contextId} for field ${field.id}`);

//   // Step 4: Add predefined options to the field context
//   const predefinedOptions = ["Must", "Should", "Could", "Would"];

//   const optionsRes = await api.asApp().requestJira(
//     route`/rest/api/3/field/${field.id}/context/${contextId}/option`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         options: predefinedOptions.map((value) => ({ value })),
//       }),
//     }
//   );

//   if (!optionsRes.ok) {
//     const errText = await optionsRes.text();
//     console.error(
//       `❌ Failed to add options to custom field ${field.id}:`,
//       errText
//     );
//   } else {
//     const options = await optionsRes.json();
//     console.log(`✅ Options added to field ${field.id}:`, options.values);

//     // Step 5: Store mapping between option and image (assets folder)
//     const imageMapping = {
//       Must: "/assets/must.png",
//       Should: "/assets/should.png",
//       Could: "/assets/could.png",
//       Would: "/assets/w.png",
//     };

//     await storage.set(`customField:${field.id}:images`, imageMapping);
//     console.log("✅ Image mapping stored in Forge storage");
//   }

//   return field;
// });







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
