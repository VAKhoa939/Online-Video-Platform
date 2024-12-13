import { Request, Response } from "express";
import Video from "../models/video.model";
import { formatDuration } from "../utils/durationUtils";

export const getDefaultRecommendedVideos = async (
  req: Request,
  res: Response
) => {
  try {
    const videos = await Video.find({ isDefaultRecommended: true });
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
