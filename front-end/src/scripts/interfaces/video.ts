import { User } from "./user";
import axios from "axios";

export interface Video {
  id: string;
  videoLink: string;
  thumbnail: string;
  duration: string;
  title: string;
  stats: string;
  channelLink: string;
  channelPicture: string;
  channelName: string;
  keywords: string[];
  isDefaultRecommended: boolean;
}

const VIDEO_API_URL = `${import.meta.env.VITE_API_URL}/videos`;

export async function getRecommendedVideos(
  user: User | null
): Promise<Video[]> {
  let route = "/recommend";
  if (user && user.videoHistory.length) route += `/${user._id}`;
  const res = await axios.get(VIDEO_API_URL + route);
  return await res.data.data;
}

export function getVideoHistory(user: User | null) {
  if (user && user.videoHistory.length) return [...user.videoHistory];
  return [] as Video[];
}
