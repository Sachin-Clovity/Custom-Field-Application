// import api, { route, storage } from "@forge/api";
// import Resolver from "@forge/resolver";

// const resolver = new Resolver();

// /**
//  * Fetch Jira screens with pagination
//  */
// resolver.define("getScreens", async () => {
//   let startAt = 0;
//   let allScreens = [];

//   while (true) {
//     const res = await api.asApp().requestJira(
//       route`/rest/api/3/screens?startAt=${startAt}&maxResults=50`
//     );

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("❌ Failed to fetch screens:", errText);
//       throw new Error("Could not fetch screens");
//     }

//     const data = await res.json();
//     if (data.values) {
//       allScreens = [...allScreens, ...data.values];
//     }

//     if (data.isLast || !data.values?.length) break;
//     startAt += 50;
//   }

//   console.log(`📊 [Backend] Total screens fetched: ${allScreens.length}`);
//   return allScreens.map((s) => ({ id: s.id, name: s.name }));
// });


// // // this is working for custome field with dropdown option 

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
//   }

//   return field;
// });


// /**
//  * Associate custom field to selected screens
//  */
// resolver.define("associateFieldToScreens", async ({ payload }) => {
//   const { customFieldId, screens } = payload;
//   console.log("🔗 [Backend] Associating field", customFieldId, "to screens:", screens);

//   const results = [];

//   for (const screenId of screens) {
//     try {
//       const tabsRes = await api.asApp().requestJira(route`/rest/api/3/screens/${screenId}/tabs`);

//       if (!tabsRes.ok) {
//         const errText = await tabsRes.text();
//         console.error(`❌ Failed tabs fetch for screen ${screenId}:`, errText);
//         results.push({ screenId, success: false, error: errText });
//         continue;
//       }

//       const tabs = await tabsRes.json();
//       const firstTabId = tabs[0]?.id;
//       if (!firstTabId) {
//         results.push({ screenId, success: false, error: "No tabs available" });
//         continue;
//       }

//       const addRes = await api.asApp().requestJira(
//         route`/rest/api/3/screens/${screenId}/tabs/${firstTabId}/fields`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fieldId: customFieldId }),
//         }
//       );

//       if (!addRes.ok) {
//         const errText = await addRes.text();
//         console.error(`❌ Failed field add for screen ${screenId}:`, errText);
//         results.push({ screenId, success: false, error: errText });
//         continue;
//       }

//       results.push({ screenId, success: true });
//     } catch (err) {
//       results.push({ screenId, success: false, error: err.message });
//     }
//   }

//   console.log("📊 [Backend] Association results:", results);
//   return { success: results.every((r) => r.success), results };
// });

// export const handler = resolver.getDefinitions();
































import api, { route, storage, requestJira } from "@forge/api";
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


// // this is working for custome field with dropdown option 

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
//   }

//   return field;
// });




// this is working for single selected templet now i am going to add for multiple template

resolver.define('createCustomField', async ({ payload }) => {
  const { name, description, typeId, addToDefaultScreen } = payload || {};
  console.log("request for", payload);

  if (!name || !typeId) {
    throw new Error('Missing required params: name, typeId');
  }

  // 1) Create the field
  const res = await api.asApp().requestJira(route`/rest/api/3/field`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      name,
      description: description || '',
      type: typeId, // For Forge customFieldType, use the ARI id as "type"
      // Do NOT set searcherKey – not needed for Forge types
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Create field failed: ${res.status} ${res.statusText} - ${text}`);
  }

  const field = await res.json(); // { id: "customfield_XXXXX", key, name, ... }

  
    console.log("fieldddd...created....", field);
  // 3) (Optional advanced) Create/assign contexts here if you want project/issuetype scoping
  // POST /rest/api/3/field/{fieldId}/contexts with { projectIds:[], issueTypeIds:[] }
  // If you omit both arrays, Jira creates a global context.
  // (See Jira REST "Issue custom field contexts" doc)

  return { id: field.id, key: field.key, name: field.name };
});






// resolver.define('createCustomField', async ({ payload }) => {
//   const { name, description, typeId, config } = payload || {};
//   console.log('createCustomField payload:', payload);

//   if (!name || !typeId) {
//     throw new Error('Missing required params: name, typeId');
//   }

//   const res = await api.asApp().requestJira(route`/rest/api/3/field`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
//     body: JSON.stringify({
//       name,
//       description: description || '',
//       type: typeId
//     }),
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`Create field failed: ${res.status} ${res.statusText} - ${text}`);
//   }

//   const field = await res.json(); // { id: "customfield_XXXXX", ... }
//   console.log('Field created:', field);

//   // Store config so Edit / View can resolve template options/icons
//   if (config && config.templateType) {
//     const fullId = field.id; // e.g. "customfield_10068"
//     const numericId = fullId.startsWith('customfield_') ? fullId.slice('customfield_'.length) : fullId;

//     console.log('Saving config for keys:', `field-config-${fullId}`, `field-config-${numericId}`, 'value:', config);

//     await storage.set(`field-config-${fullId}`, config);
//     await storage.set(`field-config-${numericId}`, config);
//   } else {
//     console.warn('No templateType provided in config; skipping storage.');
//   }

//   return { id: field.id, key: field.key, name: field.name };
// });

// /**
//  * Read config by fieldId. Tries both full and numeric keys.
//  */
// resolver.define('getFieldConfig', async ({ payload }) => {
//   const { fieldId } = payload || {};
//   if (!fieldId) return null;

//   const fullId = String(fieldId);
//   const numericId = fullId.replace('customfield_', '');
//   const keysToTry = [`field-config-${fullId}`, `field-config-${numericId}`];

//   for (const key of keysToTry) {
//     const cfg = await storage.get(key);
//     if (cfg) {
//       console.log('Config hit:', key, cfg);
//       return cfg;
//     }
//   }
//   console.warn('No config found for field:', fieldId, 'tried keys:', keysToTry);
//   return null;
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




resolver.define('saveFieldConfig', async (req) => {
  const { fieldId, config } = req.payload;
  console.log("request for save..", req);
  await storage.set(`cf-config:${fieldId}`, config);
   const cfg = await storage.get(`cf-config:${fieldId}`);
   console.log("save value in saveco....", cfg);
  return { ok: true };
});

resolver.define('getFieldConfig', async (req) => {
  console.log("hheelell...");
  const { fieldId } = req.payload;
  const cfg = await storage.get(`cf-config:${fieldId}`);
  console.log("get value in getvade....", cfg);
  return cfg || {};
});

export const handler = resolver.getDefinitions();


