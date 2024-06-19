import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"], // Email validation
    },
    password: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: false,
      default: null,
    },
    location: {
      type: String,
      required: false,
      default: null,
    },
    paymentMode: {
      type: String,
      required: false,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Define roles
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
