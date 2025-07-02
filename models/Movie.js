import mongoose from "mongoose";

const movieSchema= new mongoose.Schema({
  userId:String,
  name:String,
  status: String,
  lang: String,
  genre: String,
  rating: String,
  time: String,
});

export default mongoose.Schema("Movie", movieSchema);