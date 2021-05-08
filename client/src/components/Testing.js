// import React, { useState, useRef, useEffect } from "react";
// import { Typography, Form } from "antd";

// const { Title } = Typography;
// let canvas,
//   ctx,
//   rect = {},
//   drag = false;

// // initial state
// const initialrectData = {
//   id: 0,
//   label: "",
//   startX: 0,
//   startY: 0,
//   endX: 0,
//   endY: 0,
//   memo: "",
// };
// const initialWorkImgs = {
//   name: "",
//   image_array: [], // array of strings
// };
// const mouseDown = (e) => {
//   rect.startX = e.offsetX;
//   rect.startY = e.offsetY;
//   drag = true;
// };
// const mouseUp = (e) => {
//   rect.endX = e.offsetX;
//   rect.endY = e.offsetY;
//   drag = false;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.strokeStyle = "rgba(255, 0, 0, 1)";
//   ctx.setLineDash([]);
//   ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
//   console.log("rect 값 : ", rect);

//   rect = {};
// };
// const mouseMove = (e) => {
//   if (drag) {
//     rect.w = e.offsetX - rect.startX;
//     rect.h = e.offsetY - rect.startY;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     draw();
//   }
// };
// const draw = () => {
//   ctx.setLineDash([6]);
//   ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
//   ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
//   ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
//   ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
// };

// function Testing() {
//   let canvasRef = useRef();

//   useEffect(() => {
//     canvas = canvasRef.current;
//     ctx = canvas.getContext("2d");
//     canvas.addEventListener("mousedown", mouseDown);
//     canvas.addEventListener("mouseup", mouseUp);
//     canvas.addEventListener("mousemove", mouseMove);
//   }, []);

//   const [StartX, setStartX] = useState(0);
//   const [StartY, setStartY] = useState(0);
//   const [EndX, setEndX] = useState(0);
//   const [EndY, setEndY] = useState(0);

//   const [RectData, setRectData] = useState(initialrectData);

//   // File input
//   const [FileUrl, setFileUrl] = useState(null);
//   const [workImgs, setWorkImgs] = useState(initialWorkImgs);
//   const onMultipleImgHandler = (e) => {
//     if (e.target.files) {
//       setWorkImgs({ ...workImgs, image_array: [...e.target.files] });
//     }
//     console.log("Update slider images", workImgs);

//     const imgFile = e.target.files[0];
//     const imgUrl = URL.createObjectURL(imgFile);
//     setFileUrl(imgUrl);
//   };
//   return (
//     <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
//       <div style={{ textAlign: "center", marginBottom: "2rem" }}>
//         <Title level={2}>Annotation Workspace</Title>
//       </div>

//       <Form>
//         <div
//           style={{
//             position: "relative",
//             height: "600px",
//             width: "600px",
//             backgroundColor: "#efefef",
//           }}
//         >
//           <canvas
//             ref={canvasRef}
//             width="600px"
//             height="600px"
//             style={{ zIndex: 10, position: "absolute" }}
//           />
//           <img
//             style={{
//               maxHeight: "100%",
//               maxWidth: "100%",
//               position: "absolute",
//             }}
//             src={FileUrl}
//           />
//         </div>
//         <br />

//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <input type="file" multiple onChange={onMultipleImgHandler} />
//         </div>
//         <br />
//         <br />
//       </Form>
//     </div>
//   );
// }

// export default Testing;

import React, { useState } from "react";
const initialFileurlstate = {
  name: "",
  src_array: [],
};

function Testing() {
  const addName = () => {
    setFileurl({ name: "cry" });
    console.log(Fileurl);
  };
  const addSrc = () => {
    setFileurl({ src_array: ["33if3fj3.jpg"] });
    console.log(Fileurl);
  };
  const addBoth = () => {
    setFileurl({ name: "cry", src_array: ["3r3r3r3r.jpg"] });
    console.log(Fileurl);
  };
  const addNew = () => {
    setFileurl({ ...Fileurl, name: "cry2" });
    console.log(Fileurl);
  };
  const [Fileurl, setFileurl] = useState(initialFileurlstate);

  return (
    <div>
      {Fileurl.name}
      <br></br>
      {Fileurl.src_array}
      <button onClick={addName}>add name</button>
      <button onClick={addSrc}>add src</button>
      <button onClick={addBoth}>add both</button>
      <button onClick={addNew}>add new</button>
    </div>
  );
}

export default Testing;
