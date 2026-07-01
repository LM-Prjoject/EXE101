const PRIMARY_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE || 'https://exe.kakgonbri.party');
const SESSION_EXPIRED_EVENT = 'auth:session-expired';

function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(normalizedPayload));
  } catch {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return false;

  return payload.exp * 1000 <= Date.now();
}

function notifySessionExpired() {
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));
}

// Thực hiện gọi API trực tiếp đến server chính với tùy chọn đính kèm Authorization header tự động
async function fetchWithFallback(path, options = {}) {
  const url = `${PRIMARY_BASE}${path}`;

  // Tự động đính kèm Authorization header nếu có token trong localStorage
  const token = localStorage.getItem('authToken');
  if (token && isTokenExpired(token)) {
    notifySessionExpired();
    return new Response(null, { status: 401, statusText: 'Session Expired' });
  }
  const headers = { ...options.headers };
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const mergedOptions = { ...options, headers };

  const response = await fetch(url, mergedOptions);

  if (response.status === 401 && token) {
    notifySessionExpired();
  }

  return response;
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
  console.error('[API Error Detail]:', { status: response.status, statusText: response.statusText, body });
  const defaultMessage = `${response.status} ${response.statusText}`;
  if (!body) return new Error(defaultMessage);
  if (typeof body === 'string') return new Error(body);
  if (body.message) return new Error(body.message);
  if (body.error) return new Error(body.error);
  if (typeof body === 'object') {
    const msg = body.title || body.detail || body.message || body.error || JSON.stringify(body);
    return new Error(msg);
  }
  return new Error(defaultMessage);
}

export { SESSION_EXPIRED_EVENT, fetchWithFallback, parseJsonResponse, buildError };
