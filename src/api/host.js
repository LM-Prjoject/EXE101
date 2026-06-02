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
    body: JSON.stringify({}),
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

/**
 * Gets reviews for all workshops managed by the current Host.
 * Calls GET /api/Community/reviews
 */
export async function getHostReviews(page = 1, pageSize = 10) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await fetchWithFallback(`/api/Community/reviews?${params}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

/**
 * Posts host response to a review.
 * Calls POST /api/Community/reviews/{reviewId}/respond
 */
export async function respondToReview(reviewId, responseText) {
  const response = await fetchWithFallback(`/api/Community/reviews/${reviewId}/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      response: responseText,
    }),
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

/**
 * Gets sold tickets belonging to the current Host's workshops.
 * Calls GET /api/Workshop/tickets
 */
export async function getHostTickets(page = 1, pageSize = 10) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await fetchWithFallback(`/api/Workshop/tickets?${params}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

/**
 * Gets participants for a specific ticket type.
 * Calls GET /api/Workshop/tickets/{ticketId}/participants
 */
export async function getTicketParticipants(ticketId, page = 1, pageSize = 10) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await fetchWithFallback(`/api/Workshop/tickets/${ticketId}/participants?${params}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

/**
 * Checks in a student for a workshop slot.
 * Calls POST /api/Workshop/tickets/checkin
 */
export async function checkInParticipant(ticketId, participantId) {
  const params = new URLSearchParams({
    ticketId: ticketId.toString(),
    TicketId: ticketId.toString(),
    participantId: participantId.toString(),
    ParticipantId: participantId.toString(),
    userId: participantId.toString(),
    UserId: participantId.toString(),
    studentId: participantId.toString(),
    StudentId: participantId.toString(),
  });

  const response = await fetchWithFallback(`/api/Workshop/tickets/checkin?${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ticketId: Number(ticketId),
      TicketId: Number(ticketId),
      participantId: participantId,
      ParticipantId: participantId,
      userId: participantId,
      UserId: participantId,
      studentId: participantId,
      StudentId: participantId,
    }),
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}


