import { Router } from "express";
import {
  getAllVideos,
  getDefaultRecommendedVideos,
} from "../controllers/video.controller";

const router = Router();

router.route("/recommend").get(getDefaultRecommendedVideos);
router.route("/recommend/:userId").get(getAllVideos);

export default router;
