import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div>hellow glance</div>
    </div>
  );
}

export default App;















// // export default function GlanceImage() {
// //   const [data, setData] = useState(null);

// //   useEffect(() => {
// //     invoke("getCustomFieldImage")
// //       .then(setData)
// //       .catch(console.error);
// //   }, []);

// //   if (!data) return <p>Loading...</p>;

// //   if (!data.imageUrl)
// //     return <p>No image assigned for this issue field.</p>;

// //   return (
// //     <div style={{ textAlign: "center" }}>
// //       <img
// //         src={data.imageUrl}
// //         alt={data.value}
// //         style={{ width: "120px", height: "120px" }}
// //       />
// //       <p>{data.value}</p>
// //     </div>
// //   );
// // }









































// import React, { useEffect, useState } from "react";
// import { invoke } from "@forge/bridge";

// export default function FieldImageGlance() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     invoke("getCustomFieldImage")
//       .then(setData)
//       .catch(console.error);
//   }, []);

//   if (!data) return <p>Loading...</p>;

//   if (!data.hasValue)
//     return <p style={{ color: "gray" }}>{data.message || "No data found"}</p>;

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <img
//         src={data.imageUrl}
//         alt={data.value}
//         style={{ width: "100px", height: "100px", borderRadius: "10px" }}
//       />
//       <p style={{ marginTop: "10px", fontWeight: "bold" }}>{data.value}</p>
//     </div>
//   );
// }
