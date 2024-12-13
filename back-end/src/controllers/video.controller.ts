import { NextFunction, Request, Response } from "express";
import IVideo from "../interfaces/iVideo";
import Video, {
  readRecommendedVideos,
  readVideoHistory,
} from "../models/video.model";
import { formatDuration } from "../utils/durationUtils";

export const getRecommendedVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos: IVideo[] = readRecommendedVideos();
    res.status(200).json(videos);
  } catch (e) {
    return next(e);
  }
};

export const getVideoHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const videos: IVideo[] = readVideoHistory(userId);
    res.status(200).json(videos);
  } catch (e) {
    return next(e);
  }
};

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find();
    const formattedVideos = videos.map((video) => {
      const duration = formatDuration(video.duration);
      return { ...video.toObject(), duration };
    });
    res.json({ data: formattedVideos });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Error during getVideoById:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }
    const duration = formatDuration(video.duration);
    res.json({ ...video.toObject(), duration });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Error during getVideoById:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
};
