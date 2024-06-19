import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { database } from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//port and database
app.listen(port, async () => {
  try {
    await database;
    console.log(`connected and listening to port:${port}`);
  } catch (error) {
    console.log(error);
  }
});

//default route
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

//user route
app.use("/user",userRoutes)

