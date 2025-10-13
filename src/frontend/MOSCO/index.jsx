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



// 1) Map dropdown values -> image + label
// const ICONS = {
//   apple:  { label: 'Apple',  url: APPLE_SVG },
//   banana: { label: 'Banana', url: BANANA_SVG },

//   // add your own values/images here, e.g.
//   // must:   { label: 'MUST',  url: 'https://your-cdn.example.com/icons/m.svg' },
//   // should: { label: 'SHOULD',url: 'https://your-cdn.example.com/icons/s.svg' },
//   // zepto:  { label: 'Zepto', url: 'https://your-cdn.example.com/icons/zepto.png' },
// };







const MUST_SVG =
  'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3' +
  'N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbW' +
  'ciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLWVtb2ppb25lIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiBmaW' +
  'xsPSIjMDAwMDAwIj48ZyBpZD0iU1ZHUmVwb19iZ0NhcnJpZXIiIHN0cm9rZS13aWR0aD0iMCI+PC9nPjxnIGlkPSJTVkdSZXBvX3' +
  'RyYWNlckNhcnJpZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9nPjxnIGlkPSJTVk' +
  'dSZXBvX2ljb25DYXJyaWVyIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMCIgZmlsbD0iIzRmZDFkOSI+PC9jaXJjbGU+PH' +
  'BhdGggZD0iTTM3LjMgMTcuNUg0NnYyOWgtNS43VjIyLjFsLTUuNSAyNC40SDI5bC01LjUtMjQuNHYyNC40SDE4di0yOWg4LjhsNS' +
  '4zIDIyLjhsNS4yLTIyLjgiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L2c+PC9zdmc+';

const SHOULD_SVG =
  'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3' +
  'N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbW' +
  'ciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLWVtb2ppb25lIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiBmaW' +
  'xsPSIjMDAwMDAwIj48ZyBpZD0iU1ZHUmVwb19iZ0NhcnJpZXIiIHN0cm9rZS13aWR0aD0iMCI+PC9nPjxnIGlkPSJTVkdSZXBvX3' +
  'RyYWNlckNhcnJpZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9nPjxnIGlkPSJTVk' +
  'dSZXBvX2ljb25DYXJyaWVyIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMCIgZmlsbD0iIzRmZDFkOSI+PC9jaXJjbGU+PH' +
  'BhdGggZD0iTTI1LjggMzcuNmMuMiAxLjMuNiAyLjMgMS4xIDNjMSAxLjIgMi43IDEuOCA1LjIgMS44YzEuNSAwIDIuNi0uMiAzLj' +
  'YtLjVjMS43LS42IDIuNi0xLjcgMi42LTMuNGMwLTEtLjQtMS43LTEuMy0yLjJjLS44LS41LTIuMi0xLTQtMS40bC0zLjEtLjdjLT' +
  'MuMS0uNy01LjItMS40LTYuNC0yLjJjLTItMS4zLTIuOS0zLjQtMi45LTYuM2MwLTIuNiAxLTQuOCAyLjktNi41YzEuOS0xLjcgNC' +
  '43LTIuNiA4LjQtMi42YzMuMSAwIDUuNy44IDcuOSAyLjRjMi4yIDEuNiAzLjMgNCAzLjQgNy4xaC01LjhjLS4xLTEuNy0uOS0zLT' +
  'IuMy0zLjdjLTEtLjUtMi4yLS43LTMuNi0uN2MtMS42IDAtMi45LjMtMy44LjlzLTEuNCAxLjUtMS40IDIuNmMwIDEgLjUgMS44ID' +
  'EuNCAyLjNjLjYuMyAxLjkuNyAzLjkgMS4ybDUuMSAxLjJjMi4yLjUgMy45IDEuMiA1IDIuMWMxLjcgMS40IDIuNiAzLjMgMi42ID' +
  'UuOWMwIDIuNy0xIDQuOS0zLjEgNi42Yy0yIDEuOC00LjkgMi42LTguNyAyLjZjLTMuOCAwLTYuOC0uOS05LTIuNmMtMi40LTEuNS' +
  '0zLjUtMy45LTMuNS02LjloNS44IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9nPjwvc3ZnPg==';

const COULD_SVG =
  'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzYgMzYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3' +
  'N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbW' +
  'ciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLXR3ZW1vamkiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIGZpbG' +
  'w9IiMwMDAwMDAiPjxnIGlkPSJTVkdSZXBvX2JnQ2FycmllciIgc3Ryb2tlLXdpZHRoPSIwIj48L2c+PGcgaWQ9IlNWR1JlcG9fdH' +
  'JhY2VyQ2FycmllciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2c+PGcgaWQ9IlNWR1' +
  'JlcG9faWNvbkNhcnJpZXIiPjxwYXRoIGZpbGw9IiMzQjg4QzMiIGQ9Ik0zNiAzMmE0IDQgMCAwIDEtNCA0SDRhNCA0IDAgMCAxLT' +
  'QtNFY0YTQgNCAwIDAgMSA0LTRoMjhhNCA0IDAgMCAxIDQgNHYyOHoiPjwvcGF0aD48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTkuNz' +
  'IzIDYuNTUyYzIuMjY0IDAgNi42NjYuNzQ0IDYuNjY2IDMuNDczYzAgMS4xMTYtLjc3NSAyLjA3Ny0xLjkyMiAyLjA3N2MtMS4yNz' +
  'IgMC0yLjEzOS0xLjA4NS00Ljc0NC0xLjA4NWMtMy44NDQgMC01LjgyOSAzLjI1Ni01LjgyOSA3LjAzOGMwIDMuNjg5IDIuMDE1ID' +
  'YuODUyIDUuODI5IDYuODUyYzIuNjA1IDAgMy42NTgtMS4zMDIgNC45My0xLjMwMmMxLjM5NiAwIDIuMDQ3IDEuMzk1IDIuMDQ3ID' +
  'IuMTA3YzAgMi45NzctNC42ODIgMy42NTktNi45NzYgMy42NTljLTYuMjk0IDAtMTAuNjY2LTQuOTkyLTEwLjY2Ni0xMS40MWMtLj' +
  'AwMS02LjQ0OCA0LjM0LTExLjQwOSAxMC42NjUtMTEuNDA5eiI+PC9wYXRoPjwvZz48L3N2Zz4=';

const WOULD_SVG =
  'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3' +
  'N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbW' +
  'ciIGNsYXNzPSJpY29uaWZ5IGljb25pZnktLWVtb2ppb25lIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiBmaW' +
  'xsPSIjMDAwMDAwIj48ZyBpZD0iU1ZHUmVwb19iZ0NhcnJpZXIiIHN0cm9rZS13aWR0aD0iMCI+PC9nPjxnIGlkPSJTVkdSZXBvX3' +
  'RyYWNlckNhcnJpZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9nPjxnIGlkPSJTVk' +
  'dSZXBvX2ljb25DYXJyaWVyIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMCIgZmlsbD0iIzRmZDFkOSI+PC9jaXJjbGU+PH' +
  'BhdGggZD0iTTIwIDE3LjVsMy44IDE2LjZsLjggNC42bC44LTQuNWwzLjMtMTYuN2g2LjRsMy40IDE2LjZsLjkgNC42bC45LTQuNG' +
  'wzLjktMTYuOGg2LjJsLTguMiAyOWgtNS44bC0zLjUtMTdsLTEtNS42bC0xIDUuNmwtMy41IDE3aC01LjZsLTguMi0yOUgyMCIgZm' +
  'lsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvZz48L3N2Zz4=';




const ICONS = {
  must:  { label: 'Must',  url: MUST_SVG },
  should: { label: 'Should', url: SHOULD_SVG },
  could:  { label: 'Must',  url: COULD_SVG },
  would: { label: 'Would', url: WOULD_SVG },
    m:  { label: 'M',  url: APPLE_SVG },
  s: { label: 'S', url: BANANA_SVG },
  c:  { label: 'M',  url: APPLE_SVG },
  w: { label: 'W', url: BANANA_SVG }

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


