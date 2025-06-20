import express, { Request, Response, Router } from "express";
import { Book } from "../models/book.model";

export const bookRoutes: Router = express.Router();

// Crate book

bookRoutes.post("/", async (req: Request, res: Response) => {
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

// Get all books

bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
    } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const sortOptions: any = {};
    sortOptions[sortBy as string] = sort === "asc" ? 1 : -1;

    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(parseInt(limit as string));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
});

// Get books by ID

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: `No book found with ID ${bookId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve book",
      error: error.message,
    });
  }
});

// Update books by ID

bookRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed book updated",
      error: error.message,
    });
  }
});

// Delete Books

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
    
});
