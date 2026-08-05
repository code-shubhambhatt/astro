const API_BASE = "http://localhost:5000/api";

export async function getAllServices(){
    const response = await fetch(`${API_BASE}/services`);
    if (!response.ok) {
        throw new Error("Failed to fetch services")
    }
    const data = await response.json()
    return data.services
}