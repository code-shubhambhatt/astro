const API_BASE = import.meta.env.VITE_API_BASE;

export async function getAllServices(){
    const response = await fetch(`${API_BASE}/services`);
    if (!response.ok) {
        throw new Error("Failed to fetch services")
    }
    const data = await response.json()
    return data.services
}