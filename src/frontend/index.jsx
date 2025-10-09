// import React, { useState, useEffect } from 'react';
// import ForgeReconciler, {
//   Text,
// } from "@forge/react";
// import { view } from '@forge/bridge';

// const View = () => {
//   const [fieldValue, setFieldValue] = useState(null);

//   useEffect(() => {
//     view.getContext().then((context) => { setFieldValue(context.extension.fieldValue) });
//   }, []);

//   return (
//     <>
//       <Text>{`Hello ${fieldValue || 'world'}!`}</Text>
//     </>
//   );
// };

// ForgeReconciler.render(
//   <React.StrictMode>
//     <View />
//   </React.StrictMode>
// );






























import React, { useState, useEffect } from 'react';
import ForgeReconciler, {
  Text, Box, Image,
} from "@forge/react";
import { view } from '@forge/bridge';



/** 16×16 SVGs encoded as data URIs (no external hosting needed) */
const APPLE_SVG =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTcuODI4NDIgOC4wMDAwM0wxMi40MTQyIDMuNDE0MjRMO S45ODU3OCAwLjU4NTgxNUwyLjE3MTU3IDguMDAwMDN MOS41ODU3OCAxNS40MTQyTDEyLjQxNDIgMTIuNTg1OEw3LjgyODQyIDguMDAwMDNaIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+'; // Apple

const BANANA_SVG =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDE2TDMuNTQyMjMgMTIuMzM4M0MxLjkzMjc4IDExLjAxNjIgMSA5LjA0Mjg3IDEgNi45NjAwNUMxIDMuMTE2MTIgNCAxNi4wMDAwNyA4IDBDMTEuODQzOSAwIDE1IDMuMTE2MTIgMTUgNi45NjAwNUMxNSA5LjA0Mjg3IDE0LjA2NzIgMTEuMDE2MiAxMi40NTc4IDEyLjMzODNMOCAxNlpNMyA2SDVDNi4xMDQ1NyA2IDcgNi44OTU0MyA3IDhWO UwxMyA3LjVWNmgtMloiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4='; // Banana


// Replace with your real file id
const FILE_ID = '1iTaEd4-XOsqfYI1ezyxuBpXZojBQvPmI';

// Drive direct-view link for images
const DRIVE_IMG = `https://drive.google.com/uc?export=view&id=${FILE_ID}`;

// 1) Map dropdown values -> image + label
const ICONS = {
  apple:  { label: 'Apple',  url: APPLE_SVG },
  banana: { label: 'Banana', url: BANANA_SVG },

  // add your own values/images here, e.g.
  // must:   { label: 'MUST',  url: 'https://your-cdn.example.com/icons/m.svg' },
  // should: { label: 'SHOULD',url: 'https://your-cdn.example.com/icons/s.svg' },
  // zepto:  { label: 'Zepto', url: 'https://your-cdn.example.com/icons/zepto.png' },
};

const View = () => {
  const [fieldValue, setFieldValue] = useState(null);

  useEffect(() => {
    view.getContext().then((context) => { setFieldValue(context.extension.fieldValue) });
  }, []);

  // 2) Resolve the selected option
  const def = fieldValue ? ICONS[fieldValue] : null;

  return (
    <>
      <Box>
      {def ? (
        <Box alignX="left" alignY="center" space="xsmall">
          <Image src={def.url} alt={def.label} />
          <Text>{def.label}</Text>
        </Box>
      ) : (
        <Text>-</Text>
      )}
    </Box>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>
);
