import axios from "axios";

// Set the base URL for your API
const API_BASE_URL = "http://localhost:5001/api";

// Function to set authorization headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Login function
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Login failed" };
    }
};

// Fetch all reservations
export const getReservations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/reservations`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch reservations" };
    }
};

// Update reservation status
export const updateReservation = async (reservationId, status) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/reservations/${reservationId}`,
            { status },
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update reservation" };
    }
};
