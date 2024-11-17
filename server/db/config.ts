import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  await mongoose
    .connect(
      `${process.env.MONGO_CONNECTION_URI as string}/${
        process.env.DB_NAME as string
      }`
    )
    .then(() => {
      console.log("Database connected successfully !");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
