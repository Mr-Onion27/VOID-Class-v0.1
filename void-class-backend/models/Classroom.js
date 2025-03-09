import mongoose from "mongoose";

const ClassroomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model("Classroom", ClassroomSchema);
