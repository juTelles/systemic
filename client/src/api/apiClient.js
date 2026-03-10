export async function apiFetch(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  // console.log(`API request to /api${path} with options:`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "API error");
  }

  return data;
}