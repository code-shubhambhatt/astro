const API_BASE = "http://localhost:5000/api"

export async function getAllTestimonials(){
    const response = await fetch(`${API_BASE}/testimonials`)
    if (!response.ok )
        throw new Error("Failed to fetch")
    const data = await response.json()
    return data.testimonials
}

export async function createTestimonial(testimonialData) {
    const response = await fetch(`${API_BASE}/testimonials`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonialData),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create testimonial");
    }
    return await response.json();
}