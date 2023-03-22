import * as path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import moviesRouter from "./routes/moviesRoutes";
import subscriptionsRoutes from "./routes/subscriptionsRoutes";
import membersRoutes from "./routes/membersRoutes";
import usersRoutes from "./routes/usersRoutes";
import connectDB from "./configs/db";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// EJS settings
app.set("view engine", "ejs");
app.set("views", "views");

// Static files
app.use(express.static(path.join(__dirname, "public")));

//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET!));

// Routes
app.use("/", authRoutes);
app.use("/users", usersRoutes);
app.use("/movies", moviesRouter);
app.use("/subscriptions", subscriptionsRoutes);
app.use("/members", membersRoutes);

//Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(500).json({ error: error.message });
});

async function start() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
