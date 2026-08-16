import { apiFetch } from "./client";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function getAllServices(){
    const response = await fetch(`${API_BASE}/services`);
    if (!response.ok) {
        throw new Error("Failed to fetch services")
    }
    const data = await response.json()
    return data.services
}

export async function createService(serviceData) {

  const response = await apiFetch(`/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create service");
  }

  return data;
}

export async function updateService(serviceId, serviceData) {
  // const token = localStorage.getItem("access_token");

  const response = await apiFetch(`/services/${serviceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update service");
  }

  return data;
}