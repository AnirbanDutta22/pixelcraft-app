import express from "express";
import path from "path";
import cors from "cors";
import userRouter from "./routes/user.route";
import videoRouter from "./routes/video.route";
import defaultErrorHandler from "./middlewares/defaultErrorHandler";

//internal imports

const app = express();

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//set up routing
app.use("/api/v1", userRouter);
app.use("/api/v1", videoRouter);

//errors handler
app.use(defaultErrorHandler);

export default app;
