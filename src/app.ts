import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";


const app: Application = express();
app.use(express.json());

app.use("/", bookRoutes)


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Library Management");
});

export default app;
