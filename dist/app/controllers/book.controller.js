"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// Create Book
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_model_1.Book(req.body);
        const savedBook = yield book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: savedBook,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: err.message,
        });
    }
}));
// Get All Books
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10", } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOptions = {};
        sortOptions[sortBy] = sort === "asc" ? 1 : -1;
        const books = yield book_model_1.Book.find(query)
            .sort(sortOptions)
            .limit(parseInt(limit, 10));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: err.message,
        });
    }
}));
// Get Book by ID
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
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
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            success: false,
            message: "Failed to retrieve book",
            error: err.message,
        });
    }
}));
// Update Book by ID
exports.bookRoutes.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            success: false,
            message: "Failed to update book",
            error: err.message,
        });
    }
}));
// Delete Book by ID
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
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
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            success: false,
            message: "Failed to delete book",
            error: err.message,
        });
    }
}));
