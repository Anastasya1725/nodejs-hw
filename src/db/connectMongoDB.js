import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}


