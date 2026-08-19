import { apiFetch } from "./client";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function getAllBlogs() {
  const response = await apiFetch("/blogs");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch blogs");
  }

  return data.blogs;
}

export async function getPublishedBlogs() {
  const response = await fetch(`${API_BASE}/blogs`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch published blogs");
  }

  return data.blogs;
}

export async function createBlog(blogData) {
  const response = await apiFetch("/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create blog");
  }

  return data;
}

export async function getBlogById(id) {
  const response = await apiFetch(`/blogs/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch blog");
  }

  return data.blog;
}

export async function updateBlog(id, blogData) {
  const response = await apiFetch(`/blogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update blog");
  }

  return data;
}

export async function deleteBlog(id) {
  const response = await apiFetch(`/blogs/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to delete blog");
  }

  return data;
}