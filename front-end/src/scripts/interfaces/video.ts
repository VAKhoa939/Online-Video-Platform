import { VideoMode } from "./uiState";
import { User } from "./user";
import axios from "axios";

export interface Video {
  id: string;
  videoLink: string;
  thumbnail: string;
  time: string;
  title: string;
  stats: string;
  channelLink: string;
  channelPicture: string;
  channelName: string;
  keywords: string[];
}

const VIDEO_API_URL = `${import.meta.env.VITE_API_URL}/video`;

export async function getRecommendedVideos(): Promise<Video[]> {
  const res = await axios.get(VIDEO_API_URL + "/recommend");
  return await res.data;
}

export async function getVideoHistory(user: User): Promise<Video[]> {
  const res = await axios.get(VIDEO_API_URL + "/history/" + user.id);
  return res.data;
}

export const getVideoList = (videoMode: VideoMode, user: User) => {
  return videoMode === "history"
    ? getVideoHistory(user)
    : getRecommendedVideos();
};
