import * as path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import moviesRouter from "./routes/moviesRoutes";
import subscriptionsRoutes from "./routes/subscriptionsRoutes";
import membersRoutes from "./routes/membersRoutes";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// EJS settings
app.set("view engine", "ejs");
app.set("views", "views");

// Static files
app.use(express.static(path.join(__dirname, "public")));

//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    pageTitle: "Express + TypeScript Server",
    content: "Hello World",
  });
});

app.use("/movies", moviesRouter);
app.use("/subscriptions", subscriptionsRoutes);
app.use("/members", membersRoutes);

//Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
