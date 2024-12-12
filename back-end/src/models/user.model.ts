import { Schema, model } from "mongoose";
import IUser from "../interfaces/iUser";

const usersSchema = new Schema<IUser>({
  userName: String,
  email: String,
  password: String,
  avatar: String,
  videoHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  isAdmin: Boolean,
});

const User = model<IUser>("User", usersSchema);
export default User;
