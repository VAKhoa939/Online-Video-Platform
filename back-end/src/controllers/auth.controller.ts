import { Request, Response } from "express";
import User from "../models/user.model";
import { formatDuration } from "../utils/durationUtils";
import { genSalt, hash, compare } from "bcrypt";

export const register = async (req: Request, res: Response) => {
  const register = req.body;

  if (
    !register.userName ||
    !register.email ||
    !register.password ||
    !register.confirmPassword
  ) {
    res.status(400).json({ message: "Please fill all information" });
    return;
  }

  if (register.password !== register.confirmPassword) {
    res.status(400).json({ message: "Confirm password doesn't match" });
    return;
  }

  try {
    const user = await User.findOne({ email: register.email });
    if (user) {
      res.status(400).json({ success: false, message: "Email exists" });
      return;
    }

    const salt = await genSalt();
    const hashed = await hash(register.password, salt);

    const newUser = new User({
      userName: register.userName,
      email: register.email,
      password: hashed,
    });
    await newUser.save();

    res.status(201).json({
      message: "Register successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during register:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const login = req.body;

  if (!login.email || !login.password) {
    res.status(400).json({ message: "Please fill all information" });
    return;
  }

  try {
    const user = await User.findOne({ email: login.email })
      .populate("videoHistory")
      .exec();
    if (!user) {
      res.status(404).json({ message: "Incorrect email or password" });
      return;
    }

    const validPassword = await compare(login.password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Incorrect email or password" });
      return;
    }

    res.status(200).json({
      message: "Login successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error during login:", error.message);
      res.status(500).json({
        message: "Server error. Please try again later.",
      });
    }
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .populate("videoHistory")
      .exec();
    if (!user) {
      res.status(404).send();
      return;
    }

    const formattedVideos = user.videoHistory.map((video: any) => ({
      ...video.toObject(),
      duration: formatDuration(video.duration),
    }));
    res.json({ data: { ...user.toObject(), videoHistory: formattedVideos } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error during getUserByEmail:", error.message);
      res.status(500).json({
        message: "Server error. Please try again later.",
      });
    }
  }
};
