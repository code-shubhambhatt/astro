const API_BASE = import.meta.env.VITE_API_BASE

export async function updateAbout(about){
    const token = localStorage.getItem("access_token")
    const response = await fetch(`${API_BASE}/about`,{
        method:'PUT',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify(about)
    })
    if (!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update About")
    }
    return response.json()
} 

export async function getAbout(){
    const response = await fetch(`${API_BASE}/about`)
    if (!response.ok){
        throw new Error("Failed to fetch about info")
    }
    const data = await response.json()    
    return data.about
}