import { Router } from "express";
import {
  getRecommendedVideos,
  getVideoHistory,
} from "../controllers/video.controller";

const router = Router();

router.route("/recommend").get(getRecommendedVideos);
router.route("/history/:userId").get(getVideoHistory);

export default router;
