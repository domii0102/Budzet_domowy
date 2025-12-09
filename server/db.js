import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to the local database"))
  .catch(err => console.error("Connection error:", err));

export default mongoose;