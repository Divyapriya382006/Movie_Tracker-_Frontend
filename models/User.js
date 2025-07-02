import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  password: String,
});

export default mongoose.Schema("User", userSchema);
