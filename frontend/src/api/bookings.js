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

export async function getAllBookings(){
    const token = localStorage.getItem("access_token")
    const response = await fetch(`${API_BASE}/bookings`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
        
    })
    if (!response.ok){
        throw new Error("Failed to get bookings")
    }
    const data = await response.json()
    return data.bookings
}