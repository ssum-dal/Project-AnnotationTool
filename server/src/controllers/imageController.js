import routes from "../routes";
import Image from "../models/Image";
import s3 from "../config/s3";
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
  //const region = "ap-northeast-2";
  const bucket = "project-annotation";
  const folder =  "test/origin/";
  const file1 = "dal.jpg";
  const file2 = "dal2.jpg";
  const file3 = "go.jpg";
  
  res.set('content-type', 'application/zip')

  //const output = fs.createWriteStream(path.join(__dirname, 'download.zip'));

  s3Zip
  .archive({ s3: s3, bucket: bucket}, folder, [file1, file2, file3])
  .pipe(res)
}

const deleteDB = async (objects) =>{
  for (var i = 0; i < objects.length; i++){
    await Image.deleteOne({fileName: objects[i].Key});
  }
}
export const deleteImage = async (req, res) => {
  const objects = [//프론트에서 줘야 할 오브젝트
    { Key: 'dal.png' },
    { Key: 'dal2.png' }]
    
  await deleteDB(objects);
  s3.deleteObjects({
    Bucket: 'project-annotation',
    Delete: {
      Objects: [ 
          { Key: 'test/origin/dal.png' },
          { Key: 'test/origin/dal2.png' },
          { Key: 'test/origin/go.png' }
      ]
    }
  }, function(err, data) {
    if (err)
        return console.log(err);

    console.log('S3에서 이미지 삭제 성공');
  });  
}