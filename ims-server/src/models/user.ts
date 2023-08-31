import { Schema, model } from "mongoose";
import { type User } from "../interfaces/userI";
const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
});
const UserModel = model<User>("User", userSchema);
export default UserModel;
