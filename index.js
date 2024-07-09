import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { database } from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import incomeRoutes from './routes/incomeRoutes.js'
import expensesRoutes from "./routes/expensesRoutes.js"
import savingsRoutes from "./routes/savingsRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOption = {
  origin: [
    "http://localhost:5173",
    "https://financialbuddy.onrender.com",
  ]
};

app.use(express.json());
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public/images", express.static(path.join(__dirname, "public","images")));

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
res.json({ message: "Welcome to Finance Buddy" });
 });

//user route
app.use("/user",userRoutes)
app.use("/incomes", incomeRoutes);
app.use("/expenses", expensesRoutes);
app.use("/savings", savingsRoutes);

