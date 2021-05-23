import routes from "../routes";
import Image from "../models/Image";
import aws from "aws-sdk";
import fs from "fs";
import s3Zip from "s3-zip";
import path from "path";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY
});

export const home = (req, res) => {

  return res.sendFile(path.join(`${__dirname}/../views/index.html`));

};

export const images = (req, res) => res.send("Images");

export const upload = async (req, res) => {
  Promise.all(
    req.files.map(async (file) => {
      const newImage = new Image({
        fileUrl: file.location,
      });

      return await newImage.save();
    })
  );
  console.log("이미지 업로드");
};

export const downloadImage = (req, res) => {
  /*res.setHeader("content-type", "some/type");

  const params = {
    Bucket : "project-annotation/test",
    Key: "dal.png"
  };
  
  var stream = s3.getObject(params).createReadStream("dal.png");
  stream.pipe(res);*/
  const region = "ap-northeast-2";
  const bucket = "project-annotation";
  const folder =  "test/";
  const file1 = "dal.png";
  const file2 = "dal2.png";
  const file3 = "go.png";

  res.set('content-type', 'application/zip')

  //const output = fs.createWriteStream(path.join(__dirname, 'hahahah.zip'));

  s3Zip
  .archive({ s3 : s3, bucket: bucket}, folder, [file1, file2, file3])
  .pipe(res)

  //res.redirect(routes.home);

}

export const imageDetail = (req, res) => res.send("Image Detail");
export const deleteImage = (req, res) => res.send("Delete Image");