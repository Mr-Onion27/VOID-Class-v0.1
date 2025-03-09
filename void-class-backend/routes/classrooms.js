import express from "express";
import Classroom from "../models/Classroom.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all classrooms
router.get("/", async (req, res) => {
  const classrooms = await Classroom.find();
  res.json(classrooms);
});

// Add a classroom (Admin only)
router.post("/", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  const { name, capacity } = req.body;
  const classroom = await Classroom.create({ name, capacity });

  res.status(201).json(classroom);
});

export default router;
