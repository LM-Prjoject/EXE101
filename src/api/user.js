// User API Helper Functions

import { fetchWithFallback, parseJsonResponse, buildError } from '../api'; // Assuming internal helpers are exported

export async function fetchAllUsers(page = 1, pageSize = 20) {
  const params = new URLSearchParams({ page: page.toString(), pageSize: pageSize.toString() });
  const response = await fetchWithFallback(`/api/User/all?${params}`, { method: 'GET' });
  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }
  return body; // Expect { data: [...], total: number }
}

export async function changeName(newName, token) {
  const response = await fetchWithFallback('/api/User/change-name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: newName }),
  });
  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }
  return body;
}

export async function changePhone(newPhone, token) {
  const response = await fetchWithFallback('/api/User/change-phone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ phoneNumber: newPhone }),
  });
  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }
  return body;
}

export async function changeAvatar(avatarFile, token) {
  const form = new FormData();
  form.append('avatar', avatarFile);
  const response = await fetchWithFallback('/api/User/change-avatar', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }
  return body;
}
