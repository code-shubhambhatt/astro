import { apiFetch } from "./client";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function getAllBlogs() {
  const response = await apiFetch("/blogs");

  const data = await response.json();

  console.log("BLOG API RESPONSE:", data);
  console.log("BLOGS:", data.blogs);
  console.log("IS ARRAY:", Array.isArray(data.blogs));

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch blogs");
  }

  return data.blogs;
}

export async function getPublishedBlogs() {
  const response = await fetch(`/blogs`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch published blogs");
  }

  return data.blogs;
}