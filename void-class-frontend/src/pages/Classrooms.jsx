import { useEffect, useState } from "react";
import axios from "axios";

export default function Classrooms() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      const { data } = await axios.get("/api/classrooms");
      setClassrooms(data);
    };
    fetchClassrooms();
  }, []);

  return (
    <div>
      <h2>Available Classrooms</h2>
      <ul>
        {classrooms.map((room) => (
          <li key={room._id}>{room.name} - Capacity: {room.capacity}</li>
        ))}
      </ul>
    </div>
  );
}
