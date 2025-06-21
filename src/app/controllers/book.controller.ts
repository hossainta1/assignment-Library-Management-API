import express, { Request, Response, Router } from "express";
import { Book } from "../models/book.model";

export const bookRoutes: Router = express.Router();

// Create Book
bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err.message,
    });
  }
});

// Get All Books
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
    } = req.query;

    const query: Record<string, unknown> = {};
    if (filter) {
      query.genre = filter;
    }

    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy as string] = sort === "asc" ? 1 : -1;

    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(parseInt(limit as string, 10));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: err.message,
    });
  }
});

// Get Book by ID
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
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({
      success: false,
      message: "Failed to retrieve book",
      error: err.message,
    });
  }
});

// Update Book by ID
bookRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: err.message,
    });
  }
});

// Delete Book by ID
bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: `No book found with ID ${bookId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error: err.message,
    });
  }
});
