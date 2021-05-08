import React from "react";
import axios from "axios";

function Testing() {
  function download() {
    axios({
      url: "/images/download",
      method: "GET",
      // responseType: "blob",
    })
      .then((res) => {
        console.log(res.data.image);
        const url = window.URL.createObjectURL(new Blob([res.data.image]));
        console.log(url);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "test.jpg");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <button onClick={download}>Download</button>
    </div>
  );
}

export default Testing;
