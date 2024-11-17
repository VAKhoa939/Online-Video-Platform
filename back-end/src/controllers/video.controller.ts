import { NextFunction, Request, Response } from "express";
import Video from "../interfaces/video";
import { readAllVideos } from "../models/video.model";

export const getAllVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos: Video[] = await readAllVideos();
    res.status(200).json(videos);
  } catch (e) {
    return next(e);
  }
};
