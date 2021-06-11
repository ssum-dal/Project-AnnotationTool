// Global
const HOME = "/";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";

// Images
const IMAGES = "/images";
const UPLOAD = "/upload";
const DOWNLOAD_IMAGE = "/download";
const DELETE_IMAGE = "/delete"; //여러개 선택해야하니까 배열이어야..??

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Naver
const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

//Kakao
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";

const AUTH_USER = "/auth/user";

const routes = {
  home: HOME,
  login: LOGIN,
  logout: LOGOUT,
  users: USERS,
  userDetail: USER_DETAIL,
  images: IMAGES,
  upload: UPLOAD,
  downloadImage: DOWNLOAD_IMAGE,
  deleteImage: DELETE_IMAGE,
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  authUser: AUTH_USER
};

export default routes;
