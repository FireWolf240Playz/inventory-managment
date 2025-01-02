import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.DATABASE;
  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  await mongoose.connect(mongoURI);
};

export default connectDB;
