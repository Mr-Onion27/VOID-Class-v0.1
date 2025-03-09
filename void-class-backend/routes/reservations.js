import express from "express";
import Reservation from "../models/Reservation.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a reservation (Teacher only)
router.post("/", protect, authorize(["teacher"]), async (req, res) => {
  const { classroom, date } = req.body;
  const reservation = await Reservation.create({
    classroom,
    teacher: req.user.id,
    date,
    status: "pending",
  });

  res.status(201).json(reservation);
});

// Get all reservations (Admin only)
router.get("/", protect, authorize(["admin"]), async (req, res) => {
  const reservations = await Reservation.find().populate("classroom teacher");
  res.json(reservations);
});

// Approve or reject reservation (Admin only)
router.put("/:id", protect, authorize(["admin"]), async (req, res) => {
  const { status } = req.body;
  const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(reservation);
});

export default router;
