import express from "express";
import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, "secret");
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/", auth, async (req, res) => {
  const { name, status, lang, genre, rating, time } = req.body;
  const movie = new Movie({
    name,
    status,
    lang,
    genre,
    rating,
    time,
  });
  await movie.save();
  res.json(movie);
});

router.get("/", auth, async (req, res) => {
  const movies = await Movie.find({ userId: req.userId });
  res.json(movies);
});

router.delete("/", auth, async (req, res) => {
  await Movie.deleteOne({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Movie deleted" });
});

export default router;
