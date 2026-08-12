const API_BASE = import.meta.env.VITE_API_BASE;

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
        },
    });

    if (response.status === 401) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return response;
    }

    if (response.status === 422) {
        const data = await response.clone().json().catch(() => null);

        if (data?.msg === "Not enough segments") {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            return response;
        }
    }

    return response;
}