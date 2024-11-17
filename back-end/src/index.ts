import express from "express";
import path from "path";
import cors from "cors";
import videoRoutes from "./routes/video.routes";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/video", videoRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
