import { fetchWithFallback, parseJsonResponse, buildError } from './client';

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

export async function requestPasswordReset(email) {
  const response = await fetchWithFallback(`/api/auth/reset-password?email=${encodeURIComponent(email)}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function confirmPasswordReset(email, otp, newPassword) {
  const response = await fetchWithFallback('/api/auth/reset-password/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp, newPassword }),
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

