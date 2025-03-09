import Reservation from "../models/Reservation.js";
import Classroom from "../models/Classroom.js";

// 📌 Create a new reservation (Teacher books a classroom)
export const createReservation = async (req, res) => {
  try {
    const { roomId, date, timeSlot } = req.body;

    // Check if room is already booked for this time slot
    const existingReservation = await Reservation.findOne({ roomId, date, timeSlot, status: "Approved" });

    if (existingReservation) {
      return res.status(400).json({ message: "Classroom is already booked for this time slot." });
    }

    // Create reservation request
    const reservation = new Reservation({
      userId: req.user.userId,
      roomId,
      date,
      timeSlot,
      status: "Pending",
    });

    await reservation.save();
    res.status(201).json({ message: "Reservation request submitted." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Admin approves or rejects a reservation
export const updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update." });
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) return res.status(404).json({ message: "Reservation not found." });

    reservation.status = status;
    await reservation.save();

    res.json({ message: `Reservation ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Get all reservations (Admin only)
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("userId", "name email").populate("roomId", "roomName");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Get reservations for logged-in teacher
export const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.userId }).populate("roomId", "roomName");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 📌 Cancel a reservation (Teacher)
export const cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findOne({ _id: reservationId, userId: req.user.userId });

    if (!reservation) return res.status(404).json({ message: "Reservation not found." });

    await reservation.deleteOne();
    res.json({ message: "Reservation canceled." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
