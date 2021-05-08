import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  auth_type: String,
  auth_id: Number
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "auth_id" });

const model = mongoose.model("User", UserSchema);

export default model;