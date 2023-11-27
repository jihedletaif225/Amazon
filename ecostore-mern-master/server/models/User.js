import mongoose from "mongoose";
import bcrypt from "bcrypt";
import customError from "../Handlers/customError.js";
import gravatar from "gravatar";
import Saved from "./Saved.js";
import Cart from "./Cart.js";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash user password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// signup a user
userSchema.statics.signup = async function (body) {
  const userExist = await User.findOne({ email: body.email });

  if (userExist) throw customError("user already exist!", 404);

  var image = gravatar.url("emerleite@gmail.com", {
    s: "200",
    r: "pg",
    d: "404",
  });

  body.image = image;

  const newUser = await User.create(body);
  await Saved.create({ owner: newUser.id });
  await Cart.create({ owner: newUser.id });

  const { password, ...user } = newUser._doc;

  return user;
};

// signin a user
userSchema.statics.signin = async function (body) {
  const userExist = await User.findOne({ email: body.email });

  if (!userExist) throw customError("No user was found", 404);

  const isMatch = await bcrypt.compare(body.password, userExist.password);

  if (!isMatch) throw customError("Email or password are incorrect!", 404);

  const { password, ...user } = userExist._doc;

  return user;
};

const User = mongoose.model("users", userSchema);
export default User;
