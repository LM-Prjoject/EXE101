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

export async function getHostWithdrawRequests(token, params = {}) {
  const queryParams = new URLSearchParams();
  if (params.statusFilter !== undefined && params.statusFilter !== null) {
    queryParams.set('statusFilter', params.statusFilter.toString());
  }
  if (params.sortBy !== undefined && params.sortBy !== null) {
    queryParams.set('sortBy', params.sortBy.toString());
  }
  if (params.sortDesc !== undefined && params.sortDesc !== null) {
    queryParams.set('sortDesc', params.sortDesc.toString());
  }
  if (params.page !== undefined && params.page !== null) {
    queryParams.set('page', params.page.toString());
  }
  if (params.pageSize !== undefined && params.pageSize !== null) {
    queryParams.set('pageSize', params.pageSize.toString());
  }

  const endpoint = `/api/Revenue/requests?${queryParams.toString()}`;
  return request(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function updateHostWithdrawRequest(token, { id, status, note }) {
  return request('/api/Revenue/requests/update', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      id,
      status,
      note
    })
  });
}