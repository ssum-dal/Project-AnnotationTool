import routes from "../routes";
import Image from "../models/Image";
import AdmZip from "adm-zip";
import fs from "fs";
import path_ from "path";
var uploadDir = fs.readdirSync(__dirname+"/../imageServer"); 

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

export const downloadImage = (req, res) => {
  const zip = new AdmZip();

  for(var i = 0; i < uploadDir.length;i++){
    zip.addLocalFile(__dirname+"/../imageServer/"+uploadDir[i]);
}

  // Define zip file name
  const downloadName = `${Date.now()}.zip`;

  const data = zip.toBuffer(); 

  // save file zip in root directory
  zip.writeZip(__dirname+"/../"+downloadName);

  // code to download zip file

  res.set('Content-Type','application/octet-stream');
  res.set('Content-Disposition',`attachment; filename=${downloadName}`);
  res.set('Content-Length',data.length);
  res.send(data);
}

export const imageDetail = (req, res) => res.send("Image Detail");
export const deleteImage = (req, res) => res.send("Delete Image");