import routes from "../routes";
import Image from "../models/Image";
import path_ from "path";

export const home = (req, res) => {
  //res.send("Home");
  return res.sendFile(path_.join(`${__dirname}/../views/index.html`));
};
export const images = (req, res) => res.send("Images");

export const upload = async (req, res) => {
  Promise.all(
    req.files.map(async (file) => {
      const newImage = new Image({
        fileUrl: file.path,
      });

      return await newImage.save();
    })
  );
  console.log("이미지 업로드");
  res.redirect(routes.home);
};

export const downloadImage = (req, res) => res.send({'image' : "https://drive.google.com/uc?id=1vqE7bvY71WV2-dUKk-8f5HYruUern3aJ", 'id' : 'dal'});

export const imageDetail = (req, res) => res.send("Image Detail");
export const deleteImage = (req, res) => res.send("Delete Image");
