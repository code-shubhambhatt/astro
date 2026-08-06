const API_BASE = "http://localhost:5000/api"

export async function loginAdmin(email, password) {
    const response  = await fetch (`${API_BASE}/auth/login`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({email, password})
    })
    if (!response.ok){
        const errData = await response.json()
        throw new Error(errData.error || "Failed to Login")
    }
    return response.json()
}