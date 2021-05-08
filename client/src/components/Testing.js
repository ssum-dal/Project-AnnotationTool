import React from "react";

function Testing() {
  const download = () => {
    var element = document.createElement("a");
    var file = new Blob(
      ["https://drive.google.com/uc?id=1vqE7bvY71WV2-dUKk-8f5HYruUern3aJ"],
      {
        type: "image/*",
      }
    );
    const url = URL.createObjectURL(file);
    element.href = url;
    element.download = "image.jpg";
    element.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <a
        href="https://drive.google.com/uc?id=1vqE7bvY71WV2-dUKk-8f5HYruUern3aJ"
        download
        onClick={() => download()}
      >
        download
      </a>
      <button onClick={download}>download photo</button>
    </div>
  );
}

export default Testing;
