import { config } from './config'

// Thin fetch wrapper used once the backend exists (Phase 2+).
// Expects error bodies shaped as { error: { message, details } }.
export async function apiRequest(path, { method = 'GET', body, signal } = {}) {
  const res = await fetch(`${config.apiBaseUrl}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  const payload = await res.json().catch(() => null)

  if (!res.ok) {
    const error = new Error(payload?.error?.message || `Request failed (${res.status})`)
    error.status = res.status
    error.details = payload?.error?.details
    throw error
  }

  return payload
}
