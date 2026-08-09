const API_BASE = import.meta.env.VITE_API_BASE

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