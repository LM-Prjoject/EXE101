import { fetchWithFallback, parseJsonResponse, buildError } from './client';

export async function getWorkshops(filtersOrPage = 1, pageSize = 12, search = '') {
  let page = 1;
  let actualPageSize = 12;
  let queryVal = '';
  let locations = [];
  let categories = [];
  let levels = [];
  let priceMin = null;
  let priceMax = null;
  let durationMin = null;
  let durationMax = null;
  let scheduleWithinDays = null;
  let sortBy = 'Relevance';
  let sortDesc = 'true';

  if (typeof filtersOrPage === 'object' && filtersOrPage !== null) {
    page = filtersOrPage.page ?? 1;
    actualPageSize = filtersOrPage.pageSize ?? 12;
    queryVal = filtersOrPage.search ?? filtersOrPage.query ?? '';
    locations = filtersOrPage.locations ?? [];
    categories = filtersOrPage.categories ?? [];
    levels = filtersOrPage.levels ?? [];
    priceMin = filtersOrPage.priceMin ?? null;
    priceMax = filtersOrPage.priceMax ?? null;
    durationMin = filtersOrPage.durationMin ?? null;
    durationMax = filtersOrPage.durationMax ?? null;
    scheduleWithinDays = filtersOrPage.scheduleWithinDays ?? null;
    sortBy = filtersOrPage.sortBy ?? 'Relevance';
    sortDesc = filtersOrPage.sortDesc ?? 'true';
  } else {
    page = filtersOrPage;
    actualPageSize = pageSize;
    queryVal = search;
  }

  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: actualPageSize.toString(),
    sortBy: sortBy.toString(),
    sortDesc: sortDesc.toString(),
  });

  if (queryVal && queryVal.trim()) {
    params.set('query', queryVal.trim());
  }

  if (Array.isArray(locations) && locations.length > 0) {
    locations.forEach((loc) => params.append('locations', loc));
  }
  if (Array.isArray(categories) && categories.length > 0) {
    categories.forEach((cat) => params.append('categories', cat));
  }
  if (Array.isArray(levels) && levels.length > 0) {
    levels.forEach((lvl) => params.append('levels', lvl));
  }

  if (priceMin !== null && priceMin !== undefined) {
    params.set('priceMin', priceMin.toString());
  }
  if (priceMax !== null && priceMax !== undefined) {
    params.set('priceMax', priceMax.toString());
  }
  if (durationMin !== null && durationMin !== undefined) {
    params.set('durationMin', durationMin.toString());
  }
  if (durationMax !== null && durationMax !== undefined) {
    params.set('durationMax', durationMax.toString());
  }
  if (scheduleWithinDays !== null && scheduleWithinDays !== undefined) {
    params.set('scheduleWithinDays', scheduleWithinDays.toString());
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
