import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./config/s3";
import routes from "./routes";

const multerImage = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'project-annotation/test/origin',
      acl: 'public-read',
      key: function(req, file, cb){
        cb(null, file.originalname);
      }
  })
},'NONE');

export const localsMiddleware = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    console.log("로그아웃 합니다.");
    next();
  } else {
    console.log("로그인 하세요");
    res.redirect(routes.home);
  }
};

export const uploadImage = multerImage.array("image-files", 10);
