import mongoose from "mongoose";

export default function connectDB() {
  const url = "mongodb://127.0.0.1:27017/circula";
  try {
    mongoose.connect(url);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", () => {
    console.log(`Database connected: ${url}`);
  });
  dbConnection.on("error", (err) => {
    console.error(err);
  });
  return;
}
