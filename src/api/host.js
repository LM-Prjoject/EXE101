import { fetchWithFallback, parseJsonResponse, buildError } from './client';

/**
 * Registers the current user as a host.
 * Calls POST /api/Host/verification
 */
export async function registerHost() {
  const response = await fetchWithFallback('/api/Host/verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

/**
 * Gets host registrations for staff.
 * Calls GET /api/Host/registrations
 */
export async function getHostRegistrations({ approveFilter, sortBy, sortDesc, page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams();
  if (approveFilter !== undefined && approveFilter !== null) {
    params.set('approveFilter', approveFilter.toString());
  }
  if (sortBy !== undefined && sortBy !== null) {
    params.set('sortBy', sortBy.toString());
  }
  if (sortDesc !== undefined && sortDesc !== null) {
    params.set('sortDesc', sortDesc.toString());
  }
  params.set('page', page.toString());
  params.set('pageSize', pageSize.toString());

  const response = await fetchWithFallback(`/api/Host/registrations?${params}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

/**
 * Approves or rejects a host registration.
 * Calls POST /api/Host/update
 */
export async function updateHostRegistration({ hostId, approved, note }) {
  const response = await fetchWithFallback('/api/Host/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hostId: Number(hostId),
      approved: Boolean(approved),
      note: note || '',
    }),
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}
