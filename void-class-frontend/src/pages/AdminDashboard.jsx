import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const { data } = await axios.get("/api/reservations", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      setReservations(data);
    };
    fetchReservations();
  }, []);

  const handleApprove = async (id) => {
    await axios.put(`/api/reservations/${id}`, { status: "approved" }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  };

  return (
    <div>
      <h2>Manage Reservations</h2>
      <ul>
        {reservations.map((res) => (
          <li key={res._id}>
            {res.classroom.name} - {res.teacher.name} - {res.date} - {res.status}
            <button onClick={() => handleApprove(res._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
