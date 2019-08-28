import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: "Please enter a first name."
  },
  lastName: {
    type: String,
    required: "Please enter a last name."
  },
  email: {
    type: String,
    required: "Please enter an email address.",
    unique: true
  },
  username: {
    type: String,
    required: "Please enter a username.",
    unique: true
  },
  hashPassword: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  channels: [
    {
      type: Schema.Types.ObjectId,
      ref: "channel"
    }
  ]
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
