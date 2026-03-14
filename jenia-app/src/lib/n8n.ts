const WEBHOOK_BASE = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';

interface N8NRequestOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  formData?: FormData;
}

export async function callN8N<T = unknown>({
  endpoint,
  method = 'POST',
  body,
  formData,
}: N8NRequestOptions): Promise<T> {
  const url = `${WEBHOOK_BASE}/${endpoint}`;

  const headers: Record<string, string> = {};
  let requestBody: string | FormData | undefined;

  if (formData) {
    requestBody = formData;
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    requestBody = JSON.stringify(body);
  }

  const res = await fetch(url, {
    method,
    headers,
    body: requestBody,
  });

  if (!res.ok) {
    throw new Error(`n8n webhook error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
