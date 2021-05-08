import multer from "multer";
import routes from "./routes";


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./src/imageServer') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
  })

const multerImage = multer({storage: storage});

export const localsMiddleware = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  //console.log('출력합네다')
  //console.log(req.user)
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
    console.log('로그아웃 합니다.')
    next();
  } else {
    console.log('로그인 하세요')
    res.redirect(routes.home);
  }
};

export const uploadImage = multerImage.array("image-files", 10);