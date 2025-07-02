import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();
const app = express();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedpassword = await bcrpt.hash(password, 10);
    const user = new user({ username, password: hashedpassword });
    await user.save();
    res.json({ message: "User Created" });
  } catch (err) {
    res.status(400).json({ error: "Username Taken or invalid data" });
  }
});

export default router;
