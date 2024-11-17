//local imports
import { ApiError, NotFoundError } from "../utils/customErrorHandler";
import ResponseHandler from "../utils/responseHandler";
import asyncHandler from "../utils/asyncHandler";
import Video, { IVideo } from "../models/video.model";
import User, { IUser } from "../models/user.model";
import { NextFunction, Request, Response } from "express";

//add video
const addVideo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, prompt } = req.body;
    // const { video, thumbnail } = req.files;

    //checking if any field is unfilled
    if (!title || !prompt) {
      throw new ApiError(400, "All fields are required !");
    }

    //creating new user
    const newVideo = await Video.create({
      title,
      prompt,
    });

    if (!newVideo) {
      throw new ApiError(500, "Something went wrong!");
    }

    return res
      .status(200)
      .json(new ResponseHandler(201, "Video added successfully", newVideo));
  }
);

//delete video
const deleteVideo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { videoId } = req.body;

    //checking if any field is unfilled
    if (!videoId) {
      throw new ApiError(400, "Video ID required !");
    }

    await Video.findByIdAndDelete(videoId);

    return res
      .status(200)
      .json(new ResponseHandler(201, "Video deleted successfully", {}));
  }
);

//save video
const saveVideo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, videoId } = req.body;

    //checking if any field is unfilled
    if (!userId || !videoId) {
      throw new ApiError(400, "All fields are required !");
    }

    //checking if the user exists or not
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(409, "User doesn't exist !");
    }

    //checking if the video exists or not
    const video = await Video.findById(videoId);
    if (!video) {
      throw new ApiError(409, "Video doesn't exist !");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { savedVideos: videoId } },
      { new: true }
    ).select("-_id -refreshToken -password");

    return res
      .status(200)
      .json(
        new ResponseHandler(
          201,
          "Video added to save list successfully",
          updatedUser
        )
      );
  }
);

//get all videos
const getVideos = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const videos = await Video.find();

    if (!videos) {
      throw new NotFoundError("Videos not found");
    }

    return res
      .status(200)
      .json(
        new ResponseHandler(201, "All videos fetched successfully", videos)
      );
  }
);

//search videos

export { addVideo, deleteVideo, saveVideo, getVideos };
