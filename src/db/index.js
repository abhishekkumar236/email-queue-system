import mongoose from "mongoose";

async function connectDb() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    if (connection) {
      console.log("Database connected");
    }
  } catch (error) {
    throw new Error("Error in connecting database");
  }
}

export default connectDb;
