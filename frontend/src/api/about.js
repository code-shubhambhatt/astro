import { apiFetch } from "./client";

export async function updateAbout(about) {
    const response = await apiFetch("/about", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(about),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to update About");
    }
    return data;
}

export async function getAbout() {
    const response = await apiFetch("/about");
    if (!response.ok) {
        throw new Error("Failed to fetch about info");
    }
    const data = await response.json();
    return data.about;
}