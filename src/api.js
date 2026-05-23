const PRIMARY_BASE = import.meta.env.VITE_API_BASE || 'https://exe.kakgonbri.party';

async function fetchWithFallback(path, options = {}) {
  const url = `${PRIMARY_BASE}${path}`;
  const authToken = localStorage.getItem('authToken');
  const requestOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  };

  return fetch(url, requestOptions);
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
  params.set('query', search.trim());
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

export async function getMyWorkshops(page = 1, pageSize = 12) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await fetchWithFallback(`/api/workshop/my?${params}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function createWorkshop(workshop) {
  const response = await fetchWithFallback('/api/workshop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(workshop),
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function uploadImage(file) {
  const form = new FormData();
  form.append('file', file);

  const response = await fetchWithFallback('/api/image', {
    method: 'POST',
    body: form,
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body; 
}

export async function deleteWorkshop(id) {
  if (!id) {
    throw new Error('Không tìm thấy ID workshop để xóa.');
  }

  const response = await fetchWithFallback(`/api/workshop/${id}`, {
    method: 'DELETE',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function updateWorkshop(id, payload) {
  if (!id) {
    throw new Error('Không tìm thấy ID workshop để cập nhật.');
  }

  const response = await fetchWithFallback(`/api/workshop/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
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
