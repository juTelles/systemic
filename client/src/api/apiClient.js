export async function apiFetch(path, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(`/api${path}`, {
      ...options,
      headers,
    });

    let data = null;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      return {
        ok: false,
        code: data?.code || data?.error?.code || 'INTERNAL_ERROR',
        status: res.status,
        isUnexpected: false,
      };
    }

    return {
      ok: true,
      ...data,
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      code: err.code || 'INTERNAL_ERROR',
      status: 0,
      error: err.message || 'An unexpected error occurred',
      isUnexpected: true,
    };
  }
}
