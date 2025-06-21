# 📚 Library Management API

A RESTful Library Management System built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This system supports book creation, retrieval, updates, deletion, borrowing functionality, and summary using aggregation.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Postman (for testing)
- Dotenv (for environment variables)

---

## 📦 Setup Instructions

### 🔧 Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)
- Git

### ⚙️ Installation

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
npm install
```

### 🧪 Environment Variables

Create a `.env` file in the root:

```
DB_USER=your_db_user
DB_PASS=your_db_password
```

### 🏁 Run the server

```bash
npm run dev
```

Server runs at: `http://localhost:5000`

---

## 📚 API Endpoints

### 1. ✅ Create a Book

**POST** `/api/books`

```json
Request Body:
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

```json
Response:
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "...",
    "title": "...",
    ...
  }
}
```

---

### 2. 📄 Get All Books

**GET** `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

Returns books with optional filtering, sorting, and pagination.

---

### 3. 📘 Get Book by ID

**GET** `/api/books/:bookId`

Returns a single book by ID.

---

### 4. ✏️ Update Book

**PUT** `/api/books/:bookId`

```json
Request:
{
  "copies": 50
}
```

---

### 5. ❌ Delete Book

**DELETE** `/api/books/:bookId`

```json
Response:
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

### 6. 📥 Borrow Book

**POST** `/api/borrow`

```json
Request:
{
  "book": "bookObjectId",
  "quantity": 2,
  "dueDate": "2025-07-18"
}
```

Business Logic:
- Checks availability.
- Reduces `copies`.
- If `copies === 0`, sets `available = false`.

---

### 7. 📊 Borrow Summary

**GET** `/api/borrow`

Returns total borrowed quantity per book using aggregation.

```json
Response:
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## ❗ Generic Error Response

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "kind": "min"
      }
    }
  }
}
```

---

## ✅ Project Highlights

- ✅ Mongoose Schema Validation  
- ✅ Business Logic (availability on borrow)  
- ✅ Aggregation Pipeline  
- ✅ Middleware: `pre` save hook to auto-set availability  
- ✅ Mongoose Static Method: `updateAvailability`  
- ✅ RESTful & modular folder structure using MVC  
- ✅ Postman-compatible API

---

## 👨‍💻 Author

**Tanvir Hossain**  





