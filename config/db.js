import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const database = mongoose.connect(process.env.MONGODBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000,
});
