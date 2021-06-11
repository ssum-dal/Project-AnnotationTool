import express from "express";
import routes from "../routes";
import {
  images,
  upload,
  downloadImage,
  deleteImage,
} from "../controllers/imageController";
import { onlyPrivate, uploadImage } from "../middleware";

const imageRouter = express.Router();

imageRouter.get(routes.images, images);
imageRouter.post(routes.upload, uploadImage, upload);
imageRouter.get(routes.downloadImage, downloadImage);
imageRouter.get(routes.deleteImage, deleteImage);

export default imageRouter;
