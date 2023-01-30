import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 25,
    minlength: 3,
    required: true,
  },
  userId: {
    type: String,
    maxlength: 12,
    minlength: 8,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = new mongoose.model("Users", userSchema, "users");
export default userModel;
