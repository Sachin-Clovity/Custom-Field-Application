import React, { useState, useCallback } from 'react';
import ForgeReconciler, { Select } from '@forge/react';
import { CustomFieldEdit } from '@forge/react/jira';
import { view } from '@forge/bridge';

const Edit = () => {
  const [value, setValue] = useState('');


  const onSubmit = useCallback(async () => {
    try {
      await view.submit(value);
    } catch (e) {
      console.error(e);
    }
  }, [view, value]);

  const selectOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ];

//   const selectOptions = [
//     { label: 'Must', value: 'must' },
//     { label: 'Should', value: 'should' },
//     { label: 'Could', value: 'could' },
//     { label: 'Would', value: 'would' }
//   ];

  const handleOnChange = useCallback((e) => {
    setValue(e.value);
  }, []);

  return (
    <CustomFieldEdit onSubmit={onSubmit} hideActionButtons>
      <Select appearance="default" options={selectOptions} onChange={handleOnChange} />
    </CustomFieldEdit>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Edit />
  </React.StrictMode>
);
