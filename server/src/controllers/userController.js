import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const login = (req, res) => res.send("Login");

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  //console.log(accessToken, refreshToken, profile, cb);

  const {
    _json: { id, name, email },
  } = profile;

  try {
    const user = await User.findOne({ auth_id: id });

    if (user) {
      user.auth_id = id;
      user.save();
      console.log("Old User --Github Login");
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      auth_id: id,
      auth_type: "github",
    });
    console.log("New User --Github Login");
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const naverLogin = passport.authenticate("naver");

export const naverLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  //console.log(accessToken, refreshToken, profile, cb);

  const {
    _json: { id, name, email },
  } = profile;

  try {
    const user = await User.findOne({ auth_id: id });

    if (user) {
      user.auth_id = id;
      user.save();
      console.log("Old User --Naver Login");
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      auth_id: id,
      auth_type: "naver",
    });
    console.log("New User --Naver Login");
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  //console.log(accessToken, refreshToken, profile, cb);

  const {
    _json: { id, name, email },
  } = profile;

  try {
    const user = await User.findOne({ auth_id: id });

    if (user) {
      user.auth_id = id;
      user.save();
      console.log("Old User --Kakao Login");
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      auth_id: id,
      auth_type: "kakao",
    });
    console.log("New User --Kakao Login");
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postLogIn = (req, res) => {
  //res.redirect("http://localhost:3000");
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const isLogged = (req, res) => {
  if(req.user){
    res.json(req.user)
  }
};

export const users = (req, res) => res.send("Users");
export const userDetail = (req, res) => res.send("User Detail");
