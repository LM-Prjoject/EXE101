import { fetchWithFallback, parseJsonResponse, buildError } from './client';

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

export async function fetchAllWorkshops(status = '', page = 1, pageSize = 10) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  if (status) {
    params.set('status', status);
  }

  const response = await fetchWithFallback(`/api/Workshop/all?${params}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function getWorkshopReviews(workshopId, page = 1, pageSize = 10) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await fetchWithFallback(`/api/Community/reviews/${workshopId}?${params}`, {
    method: 'GET',
  });

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

export async function getScheduleDetails(id) {
  const response = await fetchWithFallback(`/api/Schedule/${id}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}

export async function getUpcomingSchedules(token, page = 1, pageSize = 10) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await fetchWithFallback(`/api/Schedule/upcoming?${params}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body;
}
