import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const database = mongoose.connect(process.env.MONGODBURI);


