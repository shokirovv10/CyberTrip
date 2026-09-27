import { API_BASE_URL } from './constants';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

/**
 * CYBERTRIP.UZ — Secure API Client
 * Uses HTTP-only Cookies with `credentials: 'include'`
 * Eliminates localStorage XSS token exfiltration vulnerabilities
 */
export async function fetchApi<T = unknown>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { headers, ...rest } = options;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    credentials: 'include', // Always send HTTP-only cookies securely
    headers: {
      ...defaultHeaders,
      ...((headers as Record<string, string>) || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `API so'rovi muvaffaqiyatsiz tugadi (${response.status})`);
    (error as unknown as { status: number }).status = response.status;
    throw error;
  }

  return response.json();
}
