import { Router } from "express";
import {
  getAllVideos,
  getRecommendedVideos,
  getVideoHistory,
} from "../controllers/video.controller";

const router = Router();

router.route("/recommend").get(getAllVideos);
router.route("/history/:userId").get(getAllVideos);

export default router;
