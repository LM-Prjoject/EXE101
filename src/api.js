const PRIMARY_BASE = import.meta.env.VITE_API_BASE || 'https://exe.kakgonbri.party';
const FALLBACK_BASE = 'http://127.0.0.1:5000';

// Thử primary trước, nếu network error hoặc 5xx thì fallback sang localhost
async function fetchWithFallback(path, options = {}) {
  const primaryUrl = `${PRIMARY_BASE}${path}`;
  const fallbackUrl = `${FALLBACK_BASE}${path}`;

  try {
    const response = await fetch(primaryUrl, options);
    // Nếu server trả về lỗi server-side (5xx) thì thử fallback
    if (response.status >= 500) {
      throw new Error(`Primary returned ${response.status}`);
    }
    return response;
  } catch {
    // Primary fail (network error, timeout, 404, 5xx) → dùng fallback
    return fetch(fallbackUrl, options);
  }
}

async function parseJsonResponse(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function buildError(response, body) {
  const defaultMessage = `${response.status} ${response.statusText}`;
  if (!body) return new Error(defaultMessage);
  if (typeof body === 'string') return new Error(body);
  if (body.message) return new Error(body.message);
  if (body.error) return new Error(body.error);
  return new Error(defaultMessage);
}
export { fetchWithFallback, parseJsonResponse, buildError };

export async function loginUser(email, password) {
  const response = await fetchWithFallback('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function registerUser(name, email, password) {
  const response = await fetchWithFallback('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function getWorkshops(page = 1, pageSize = 12, search = '') {
  const params = new URLSearchParams({
    sortBy: 'price',
    sortDesc: 'true',
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (search.trim()) {
    params.set('search', search.trim());
    params.set('keyword', search.trim());
    params.set('title', search.trim());
  }

  let response = await fetchWithFallback(`/api/workshop/search?${params}`, {
    method: 'GET',
  });

  if (response.status === 404) {
    response = await fetchWithFallback(`/api/workshops?${params}`, {
      method: 'GET',
    });
  }

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function getWorkshopById(id) {
  const response = await fetchWithFallback(`/api/workshop/${id}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return { id: Number(id), ...body };
}

export async function getUserById(id) {
  const response = await fetchWithFallback(`/api/User/${id}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return { id: Number(id), ...body };
}

export async function confirmOtp(email, otp) {
  const params = new URLSearchParams({ email, otp });

  const response = await fetchWithFallback(`/api/auth/confirm?${params}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export function parseJwt(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = JSON.parse(atob(payload));

    return {
      ...json,
      id: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || json.nameid || json.sub,
      name: json.name || json.unique_name || json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || json.email,
      role: json['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || json.role,
    };
  } catch {
    return null;
  }
}
