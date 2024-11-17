import jwt, { JwtPayload } from "jsonwebtoken";
//local imports
import { ApiError } from "../utils/customErrorHandler";
import ResponseHandler from "../utils/responseHandler";
import asyncHandler from "../utils/asyncHandler";
import User, { IUser } from "../models/user.model";
import { NextFunction, Request, Response } from "express";

// Utility method to generate tokens
const generateTokens = async (
  userId: string
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate tokens");
  }
};

//register user
const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    //checking if any field is unfilled
    if (!email || !password) {
      throw new ApiError(400, "All fields are required !");
    }

    //checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const username = email;

    //creating new user
    const user = await User.create({
      username,
      email,
      password,
    });

    const { accessToken, refreshToken } = await generateTokens(user._id);

    //checking if user is created successfully
    const createdUser = await User.findById(user._id).select(
      "-_id -password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong!");
    }
    return res.status(200).json(
      new ResponseHandler(201, "User registered successfully", {
        createdUser,
        accessToken,
        refreshToken,
      })
    );
  }
);

//login user
const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    //checking if any field is unfilled
    if (!email || !password) {
      throw new ApiError(400, "All fields are required !");
    }

    //checking if the user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(409, "User not exists ! Please register !");
    }

    //checking if given password is valid
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      throw new ApiError(409, "Invalid user login credentials");
    }

    //generate tokens
    const { accessToken, refreshToken } = await generateTokens(user._id);

    //fetching logged in user
    const loggedInUser = await User.findById(user._id).select(
      "-_id -password -refreshToken"
    );

    return res.status(200).json(
      new ResponseHandler(201, "User logged in successfully", {
        loggedInUser,
        accessToken,
        refreshToken,
      })
    );
  }
);

//logout user
const logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(
      (req as Request & { user: IUser }).user?._id, //bypassing the error req.user (saying user doesn't exist on type Request)
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json(new ResponseHandler(200, "User logged Out", {}));
  }
);

//refresh access token
const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const incomingRefreshToken =
        req.cookies?.refreshToken || req.body.refreshToken;

      if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
      }

      //verifiying token
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as JwtPayload;

      //finding user
      const user = await User.findById(decodedToken?._id);

      //checking if user exists
      if (!user) {
        throw new ApiError(401, "Access token not found");
      }

      //checking if both refresh token matches
      if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Invalid access token");
      }

      //generate new tokens
      const { accessToken, refreshToken } = await generateTokens(user._id);

      return res.status(200).json(
        new ResponseHandler(201, "Access token refreshed successfully", {
          accessToken,
          refreshToken,
        })
      );
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Invalid refresh token");
    }
  }
);

export { registerUser, loginUser, logoutUser, refreshAccessToken };
