import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

require("dotenv").config();

let server: Server;
const port = 5000;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rysigvn.mongodb.net/library_management_api?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Connected to MongoDb with Mongooes");
    server = app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {}
}

main();
