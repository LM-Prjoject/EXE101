const PRIMARY_BASE = import.meta.env.VITE_API_BASE || 'https://exe.kakgonbri.party';

// Thực hiện gọi API trực tiếp đến server chính với tùy chọn đính kèm Authorization header tự động
async function fetchWithFallback(path, options = {}) {
  const url = `${PRIMARY_BASE}${path}`;

  // Tự động đính kèm Authorization header nếu có token trong localStorage
  const token = localStorage.getItem('authToken');
  const headers = { ...options.headers };
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const mergedOptions = { ...options, headers };

  return fetch(url, mergedOptions);
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
