import { Types } from "mongoose";

export default interface IVideo extends Document {
  _id: Types.ObjectId;
  videoLink: string;
  thumbnail: string;
  duration: Date;
  title: string;
  stats: string;
  channelLink: string;
  channelPicture: string;
  channelName: string;
  keywords: string[];
  isDefaultRecommended: boolean;
}
