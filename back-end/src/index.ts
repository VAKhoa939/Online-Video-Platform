import express from "express";
import path from "path";
import cors from "cors";
import videoRoutes from "./routes/video.routes";
import authRoutes from "./routes/auth.routes";
import { connect } from "mongoose";
import { config } from "dotenv";

config();

const app = express();

app.use(cors());

app.use(express.json());

if (!process.env.MONGODB_URI) {
  console.error("MongoDB connection string is not defined.");
  process.exit(1);
}

connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/videos", videoRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
