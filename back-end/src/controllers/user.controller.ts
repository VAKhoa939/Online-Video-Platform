import { Request, Response } from "express";
import User from "../models/user.model";
import { formatDuration } from "../utils/durationUtils";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .populate(["videoHistory", "myVideos"])
      .exec();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    const formattedVideos = user.videoHistory.map((video: any) => ({
      ...video.toObject(),
      duration: formatDuration(video.duration),
    }));
    res.json({ ...user.toObject(), videoHistory: formattedVideos });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Error during getUserById:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
};
