import { Types, Document } from "mongoose";

export default interface IUser extends Document {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  videoHistory: Types.ObjectId[];
  isAdmin: boolean;
}
