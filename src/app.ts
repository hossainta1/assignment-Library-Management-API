import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";


const app: Application = express();
app.use(express.json());

// Books universal route
app.use("/api/books", bookRoutes)

// Borrow universal route
app.use("/api/borrow", borrowRoutes)


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Library Management");
});

export default app;
