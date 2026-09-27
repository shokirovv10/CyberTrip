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
  const { headers, signal, ...rest } = options;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // 15 second default timeout to prevent hanging UI
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...rest,
      signal: signal || controller.signal,
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
  } catch (err: any) {
    if (err.name === 'AbortError') {
      const timeoutErr = new Error('Server javob berish vaqti tugadi (Timeout). Iltimos qayta urinib ko\'ring.');
      (timeoutErr as any).status = 408;
      throw timeoutErr;
    }
    if (err instanceof TypeError && err.message.includes('fetch')) {
      const netErr = new Error('Server bilan aloqa o\'rnatilmadi. Internet yoki backend holatini tekshiring.');
      (netErr as any).status = 503;
      throw netErr;
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
