import { fetchWithFallback, parseJsonResponse, buildError } from './client';

async function request(endpoint, options = {}) {
  const response = await fetchWithFallback(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
    ...options,
  });

  const body = await parseJsonResponse(response);

  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function getNow(token) {
  return request('/api/time/now', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`
    }
  });
}

export async function forwardTime(token, { duration, seconds } = {}) {
  return request('/api/time/forward', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      duration,
      seconds,
    }),
  });
}

export async function backwardTime(token, { duration, seconds } = {}) {
  return request('/api/time/backward', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      duration,
      seconds,
    }),
  });
}

export async function setTimeOffset(token, { duration, seconds } = {}) {
  return request('/api/time/setoffset', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      duration,
      seconds,
    }),
  });
}

export async function resetTime(token) {
  return request('/api/time/reset', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getAllConfigurations(token) {
  return request('/api/configuration', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getConfiguration(name, token) {
  return request(`/api/configuration/${encodeURIComponent(name)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateConfiguration(name, value, token) {
  return request(`/api/configuration/${encodeURIComponent(name)}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      value,
    }),
  });
}