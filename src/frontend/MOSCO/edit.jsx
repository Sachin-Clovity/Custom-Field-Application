// import React, { useState, useCallback } from 'react';
// import ForgeReconciler, { Select } from '@forge/react';
// import { CustomFieldEdit } from '@forge/react/jira';
// import { view } from '@forge/bridge';

// const Edit = () => {
//   const [value, setValue] = useState('');


//   const onSubmit = useCallback(async () => {
//     try {
//       await view.submit(value);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [view, value]);

//   // const selectOptions = [
//   //   { label: 'Apple', value: 'apple' },
//   //   { label: 'Banana', value: 'banana' }
//   // ];

//   const selectOptions = [
//     { label: 'Must', value: 'must' },
//     { label: 'Should', value: 'should' },
//     { label: 'Could', value: 'could' },
//     { label: 'Would', value: 'would' }
//   ];

//   const handleOnChange = useCallback((e) => {
//     setValue(e.value);
//   }, []);

//   return (
//     <CustomFieldEdit onSubmit={onSubmit} hideActionButtons>
//       <Select appearance="default" options={selectOptions} onChange={handleOnChange} />
//     </CustomFieldEdit>
//   );
// };

// ForgeReconciler.render(
//   <React.StrictMode>
//     <Edit />
//   </React.StrictMode>
// );



























import React, { useState, useCallback, useEffect } from 'react';
import ForgeReconciler, { Select } from '@forge/react';
import { CustomFieldEdit } from '@forge/react/jira';
import { view, invoke } from '@forge/bridge';

const Edit = () => {
  const [value, setValue] = useState('');
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);


  // 1) get fieldId from context, then fetch config
  useEffect(() => {
    (async () => {
      try {
        const ctx = await view.getContext();
        // Forge adds field id in different places depending on module;
        // the following covers common shapes:
        const fieldId =
          ctx?.fieldId ||
          ctx?.extension?.fieldId ||
          ctx?.extension?.field?.id;


        console.log("fieldiddd....", ctx);
        console.log("idd...", fieldId);

        if (fieldId) {
          const cfg = await invoke('getFieldConfig', { fieldId });
          setConfig(cfg);
        }
      } catch (e) {
        console.error('Failed to fetch field config', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const onSubmit = useCallback(async () => {
    try {
      await view.submit(value);
    } catch (e) {
      console.error(e);
    }
  }, [view, value]);

  // const selectOptions = [
  //   { label: 'Apple', value: 'apple' },
  //   { label: 'Banana', value: 'banana' }
  // ];

  const labeledOptions = [
    { label: 'Must', value: 'must' },
    { label: 'Should', value: 'should' },
    { label: 'Could', value: 'could' },
    { label: 'Would', value: 'would' }
  ];


  const shortenedOptions = [
    { label: 'H', value: 'm' },
    { label: 'S', value: 's' },
    { label: 'C', value: 'c' },
    { label: 'W', value: 'w' }
  ];

  const fallbackOptions = [
    { label: 'Ha', value: 'must' },
    { label: 'Sa', value: 'should' },
    { label: 'Ca', value: 'could' },
    { label: 'Wa', value: 'would' }
  ];

  const handleOnChange = useCallback((e) => {
    setValue(e.value);
  }, []);

  if (loading) return null;
  console.log("type of field......", config?.view);



  // const options = config?.view === 'Shortened' ? selectOptions : selectOptionsla;


  const options =
    config?.view === 'Shortened'
      ? shortenedOptions
      : config?.view === 'Labeled'
        ? labeledOptions
        : fallbackOptions;



  return (
    <CustomFieldEdit onSubmit={onSubmit} hideActionButtons>
      <Select appearance="default" options={options} onChange={handleOnChange} />
    </CustomFieldEdit>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Edit />
  </React.StrictMode>
);




