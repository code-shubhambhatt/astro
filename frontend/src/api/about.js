const API_BASE = "http://localhost:5000/api"

// export async function updateAbout(){
//     const response = await fetch(`${API_BASE}/about`,{
//         method:'PUT',
//         headers:{
//             "Content-Type": "application/json",
//         },
//         body : JSON.stringify(about)
//     })
//     if (!response.ok){
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to update About")
//     }
//     return response.json()
// } 

export async function getAbout(){
    const response = await fetch(`${API_BASE}/about`)
    if (!response.ok){
        throw new Error("Failed to fetch about info")
    }
    const data = await response.json()    
    return data.about
}