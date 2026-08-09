const API_BASE = import.meta.env.VITE_API_BASE

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

export async function updateTestimonial(testimonialId, testimonialData) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_BASE}/testimonials/${testimonialId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(testimonialData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to update testimonial"
        );
    }

    return data;
}