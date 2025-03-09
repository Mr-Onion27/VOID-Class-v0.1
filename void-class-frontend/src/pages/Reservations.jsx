import { useEffect, useState } from "react";
import axios from "axios";

export default function Reservations() {
  const [classrooms, setClassrooms] = useState([]);
  const [classroom, setClassroom] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchClassrooms = async () => {
      const { data } = await axios.get("/api/classrooms");
      setClassrooms(data);
    };
    fetchClassrooms();
  }, []);

  const handleReserve = async () => {
    await axios.post("/api/reservations", { classroom, date }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  };

  return (
    <div>
      <h2>Book a Classroom</h2>
      <select onChange={(e) => setClassroom(e.target.value)}>
        <option value="">Select a Classroom</option>
        {classrooms.map((room) => (
          <option key={room._id} value={room._id}>{room.name}</option>
        ))}
      </select>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleReserve}>Book</button>
    </div>
  );
}
