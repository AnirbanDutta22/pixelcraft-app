import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  prompt: string;
  likes: number;
}

const VideoSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Video title is required"],
  },
  videoUrl: {
    type: String,
    required: [true, "Video URL is required"],
  },
  thumbnailUrl: {
    type: String,
  },
  prompt: {
    type: String,
    required: [true, "Video prompt is required"],
  },
  likes: Number,
});

export default mongoose.model<IVideo>("Video", VideoSchema);
