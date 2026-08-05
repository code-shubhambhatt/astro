const API_BASE = "http://localhost:5000/api"

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