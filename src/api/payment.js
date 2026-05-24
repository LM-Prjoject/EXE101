import { fetchWithFallback, parseJsonResponse, buildError } from './client';

export async function proceedPayment(ticketId) {
  const response = await fetchWithFallback(`/api/IPN/proceed/${ticketId}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body; // Expect PaymentInfoDto
}

export async function getPaymentStatus(invoiceNumber) {
  const response = await fetchWithFallback(`/api/IPN/status/${invoiceNumber}`, {
    method: 'GET',
  });

  const body = await parseJsonResponse(response);
  if (!response.ok) {
    throw buildError(response, body);
  }

  return body; // Expect { status: 'success' | 'failed' | 'pending' }
}
