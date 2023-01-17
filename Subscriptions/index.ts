import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db";
import { initMoviesDB } from "./BLL/moviesBLL";
import { initMembersDB } from "./BLL/membersBLL";
import moviesRouter from "./routes/moviesRouter";
import membersRouter from "./routes/membersRouter";

const app: Express = express();

async function start() {
  try {
    //connect to DB
    await connectDB();

    //clear movies collection, get all the movies from the API and save them to the DB
    await initMoviesDB();

    //clear members collection, get all the members from the API and save them to the DB
    await initMembersDB();
    //all good? start the server
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err: any) {
    throw new Error(err);
  }
}

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("Hello World");
  res.send("Express + TypeScript Server");
});

app.use("/movies", moviesRouter);
app.use("/members", membersRouter);

//Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

dotenv.config();
const port = process.env.PORT;

start();
