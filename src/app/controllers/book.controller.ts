import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

// Crate book 

bookRoutes.post("/api/books", async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});
