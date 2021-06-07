import aws from "aws-sdk";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region: process.env.AWS_REGION //"ap-northeast-2"
  });

  module.exports = s3;