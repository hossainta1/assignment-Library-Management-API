import express, { Request, Response, Router } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoutes: Router = express.Router();

// Borrow a Book

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
    }

    book.copies -= quantity;
    await book.save();

    const borrowRecord = new Borrow({ book: bookId, quantity, dueDate });
    const savedRecord = await borrowRecord.save();

    await Book.updateAvailability(bookId);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: savedRecord,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to borrow book",
      error: error.message,
    });
  }
});

// Borrowed books summary

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve summary",
      error: error.message,
    });
  }
});
