import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Form } from "antd";
import styled from "styled-components";

const initialProducts = {
  image_array: [], // array of strings
};
const initialFile = {
  src_array: [],
};

let canvas,
  ctx,
  rect = {},
  drag = false,
  selectedImgView;

const mouseDown = (e) => {
  rect.startX = e.offsetX;
  rect.startY = e.offsetY;
  drag = true;
};
const mouseUp = (e) => {
  rect.endX = e.offsetX;
  rect.endY = e.offsetY;
  drag = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255, 0, 0, 1)";
  ctx.setLineDash([]);
  ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
  //console.log("rect 값 : ", rect);

  rect = {};
};
const mouseMove = (e) => {
  if (drag) {
    rect.w = e.offsetX - rect.startX;
    rect.h = e.offsetY - rect.startY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
  }
};
const draw = () => {
  ctx.setLineDash([6]);
  ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
  ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
  ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
  ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
};

const loadImgView = () => {
  var img = document.getElementById("currentView");
  img.src = selectedImgView;
};

function WorkingPage() {
  let canvasRef = useRef();

  useEffect(() => {
    loadImgList();
  });

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mousemove", mouseMove);
  }, []);

  const [FileUrl, setFileUrl] = useState(initialFile);
  const [products, setProducts] = useState(initialProducts);

  const loadImgList = () => {
    var ul = document.getElementById("listdiv_ul");
    ul.innerHTML = "";
    products.image_array.map((data) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.innerText = "LOAD";
      btn.addEventListener("click", onImgSelectHandler);
      li.id = data.name;
      li.innerText = data.name;
      li.innerHTML =
        "<span>" +
        "<ThumbImg src={" +
        FileUrl.url[0] +
        "} /> <p>" +
        data.name +
        "</p> </span>";
      li.appendChild(btn);
      ul.appendChild(li);
    });
  };

  const onMultipleImgHandler = (e) => {
    if (e.target.files) {
      setProducts({ ...products, image_array: [...e.target.files] });
    }
    // 자료형에 넣고 update는 한번만 해야함 ㅇㅇㅇㅇㅇㅇ 수정하지말고 새로운것 저장해야해서
    let tmpobj = { name: [], url: [] };

    for (let i = 0; i < e.target.files.length; i++) {
      const imgFile = e.target.files[i];
      const imgUrl = URL.createObjectURL(imgFile);
      tmpobj.name.push(imgFile.name);
      tmpobj.url.push(imgUrl);
    }
    setFileUrl(tmpobj);
  };

  // 현재 클릭한 버튼 이미지로 selectedImgView 업데이트
  const onImgSelectHandler = (e) => {
    const curImgId = e.target.parentNode.id;
    const curIdx = FileUrl.name.findIndex((data) => curImgId === data);
    selectedImgView = FileUrl.url[curIdx];
    loadImgView();
  };

  // Backend와 연결해봅시다...
  const uploadHandler = async (e) => {
    console.log("multer 사용하여 파일 전송");
    e.preventDefault();
    const formData = new FormData();
    products.image_array.map((data)=> {
      formData.append("image-files", data);
    })

    console.log(formData.getAll("image-files"));

    axios.post("/images/upload", formData).then((res) => res.data);
  };

  // dir 자체를 선택하는 거 잘안나와서 우선 아무 파일이나 택하면 그 경로 선택하는 코드로 짬
  const downloadHandler = (e) => {
    const input = document.getElementById("downloadDir");
    const selectedFile = input.files[0];

    const saveDir = selectedFile.webkitRelativePath.replace(
      selectedFile.name,
      ""
    );

    // 대충 이렇게 보내면 되지 않을까..? 경로...?
    axios.post("/api/images/download", saveDir).then((res) => res.data);
  };

  return (
    <Wrapper>
      <Grid>
        <MainArea>
          <Canvas ref={canvasRef} width="800px" height="650px" />
          <WorkImg id="currentView" />
        </MainArea>
        <WorkRepos>
          <ListDiv>
            <ul id="listdiv_ul"></ul>
          </ListDiv>
          <Form
            action="/images/upload"
            method="POST"
            enctype="multipart/form-data"
          >
            <BtnDiv>
              <input type="file" name = "image-files" multiple onChange={onMultipleImgHandler} />
            </BtnDiv>
            <button type="submit" onClick={uploadHandler}>
              Upload
            </button>

            <input
              id="downloadDir"
              type="file"
              directory=""
              webkitdirectory=""
              onChange={downloadHandler}
            />
          </Form>
        </WorkRepos>
        <Labels>
          <ListDiv>
            <ol>
              <li>Label1</li>
              <li>Label2</li>
              <li>...</li>
            </ol>
          </ListDiv>
          <BtnDiv>
            <input type="text" placeholder="Enter Label name"></input>
            <button onClick>Add Label</button>
          </BtnDiv>
        </Labels>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  padding: 10px;
`;
const MainArea = styled.div`
  grid-row: 1/3;
  grid-column: 1/4;
  background-color: #f4f4f2;
  height: 650px;
  position: relative;
`;

const Canvas = styled.canvas`
  z-index: 10;
  position: absolute;
`;
const WorkImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  pointer-events: none;
`;

// 렌더링 순간에 오류가 있는지 반영이 안됨 수정필요
const ThumbImg = styled.img`
  width: 50px;
  height: 50px;
  pointer-events: none;
`;

const WorkRepos = styled.div`
  grid-column: 4/5;
  grid-row: 1/2;
  background-color: #e8e8e8;
`;

const ListDiv = styled.div`
  height: 90%;
  padding: 10px;
`;

const BtnDiv = styled.div`
  position: relative;
  padding: 5px;
`;

const Labels = styled.div`
  grid-column: 4/5;
  grid-row: 2/3;
  background-color: #bbbfca;
`;

export default WorkingPage;
