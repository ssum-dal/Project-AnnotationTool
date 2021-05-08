import express from "express";
import passport from "passport";
import routes from "../routes";
import { home } from "../controllers/imageController";
import { logout, login,
  githubLogin, postLogIn, naverLogin, kakaoLogin } from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postLogIn
);

globalRouter.get(routes.naver, naverLogin);

globalRouter.get(
  routes.naverCallback,
  passport.authenticate('naver', {failureRedirect: routes.login}),
  postLogIn
);

globalRouter.get(routes.kakao, kakaoLogin);

globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate('kakao', {failureRedirect: routes.login}),
  postLogIn
);

export default globalRouter;