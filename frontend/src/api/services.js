import { apiFetch } from "./client";

export async function getAllServices() {
    const response = await apiFetch("/services");
    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }
    const data = await response.json();
    return data.services;
}

export async function createService(serviceData) {
  const response = await apiFetch("/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const response = await apiFetch(`/services/${serviceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update service");
  }

  return data;
}