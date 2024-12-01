import { NextFunction, Request, Response } from "express";
import Video from "../interfaces/video";
import { readRecommendedVideos, readVideoHistory } from "../models/video.model";

export const getRecommendedVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos: Video[] = await readRecommendedVideos();
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
    const videos: Video[] = await readVideoHistory(userId);
    res.status(200).json(videos);
  } catch (e) {
    return next(e);
  }
};
