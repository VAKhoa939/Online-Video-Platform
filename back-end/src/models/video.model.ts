import { model, Schema } from "mongoose";
import IVideo from "../interfaces/iVideo";

const videosSchema = new Schema<IVideo>({
  videoLink: String,
  thumbnail: String,
  duration: Date,
  title: String,
  stats: String,
  channelLink: String,
  channelPicture: String,
  channelName: String,
  keywords: [String],
  isDefaultRecommended: Boolean,
});

const Video = model<IVideo>("Video", videosSchema);

export default Video;
