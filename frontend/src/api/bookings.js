import { apiFetch } from "./client"


const API_BASE = import.meta.env.VITE_API_BASE

export async function createBooking(bookingData){
    const response = await fetch(`${API_BASE}/bookings`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(bookingData)
    })
    if (!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create booking")
    }
    return response.json()
}

export async function getAllBookings() {
  const response = await apiFetch("/bookings");

  if (!response.ok) {
    throw new Error("Failed to get bookings");
  }

  const data = await response.json();
  return data.bookings;
}

export async function updateBookingStatus(id, status) {
  const response = await apiFetch(`/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to update booking"
    );
  }

  return data;
}