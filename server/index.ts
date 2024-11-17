import dotenv from "dotenv";
import connectDB from "./db/config";
import app from "./app";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Connect to the database
connectDB();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}`);
});
