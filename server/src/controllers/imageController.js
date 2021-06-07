import Image from "../models/Image";
import fs from "fs";
import s3Zip from "s3-zip";
import path from "path";


const findDBImage = async(name) =>{
  const img = await Image.findOne({ fileName: name });
  return img;
}

export const home = (req, res) => {

  return res.sendFile(path.join(`${__dirname}/../views/index.html`));

};

export const images = (req, res) => res.send("Images");

export const upload = async (req, res) => {
  const Image_Object = [];

  await Promise.all(
    req.files.map(async (file) => {
      const img = await findDBImage(file.originalname);

      if(img){
        return await img.save();
      }
  
      const newImage = new Image({
        fileUrl: file.location,
        fileName: file.originalname
      });
      Image_Object.push({fileUrl: file.location, fileName: file.originalname});
      return await newImage.save();
    })

  );
  res.json(Image_Object);
  console.log("이미지 업로드");
};

export const downloadImage = (req, res) => {
  const region = "ap-northeast-2";
  const bucket = "project-annotation";
  const folder =  "test/";
  const file1 = "dal.png";
  const file2 = "dal2.png";
  const file3 = "go.png";

  res.set('content-type', 'application/zip')

  //const output = fs.createWriteStream(path.join(__dirname, 'download.zip'));

  const archive = s3Zip
  .archive({ region: region, bucket: bucket}, folder, [file1, file2, file3])
  .pipe(res)
}

export const imageDetail = (req, res) => res.send("Image Detail");
export const deleteImage = (req, res) => res.send("Delete Image");