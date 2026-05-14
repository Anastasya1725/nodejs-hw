import mongoose from "mongoose";
import Note from "../models/note.js";

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Successfully connected to MongoDB");

    await Note.syncIndexes();

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }

};


