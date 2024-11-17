import express from "express";
const videoRouter = express.Router();
import authHandler from "../middlewares/authHandler";
import {
  getVideos,
  saveVideo,
  addVideo,
  deleteVideo,
} from "../controllers/video.controller";

//handling videos
videoRouter.route("/get-videos").get(getVideos);
videoRouter.route("/user/add-video").post(authHandler(), addVideo);
videoRouter.route("/user/delete-video").delete(authHandler(), deleteVideo);
videoRouter.route("/user/save-video").post(authHandler(), saveVideo);

export default videoRouter;
