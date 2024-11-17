import express from "express";
const userRouter = express.Router();
import authHandler from "../middlewares/authHandler";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller";

//authentication
userRouter.route("/user-register").post(registerUser);
userRouter.route("/user-login").post(loginUser);
userRouter.route("/user-logout").post(authHandler(), logoutUser);

export default userRouter;
