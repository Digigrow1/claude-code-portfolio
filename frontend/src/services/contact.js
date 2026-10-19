import { config } from './config'
import { apiRequest } from './apiClient'

export const contactMode = config.contactMode

// Phase 1: opens the visitor's mail client (no backend needed).
// Phase 2: POST /api/contact, stored in PostgreSQL. `website` is a honeypot
// field that real users never fill in; the backend drops submissions with it.
export async function submitContact({ name, email, message, website = '' }, { to } = {}) {
  if (config.contactMode === 'api') {
    await apiRequest('/contact', { method: 'POST', body: { name, email, message, website } })
    return { via: 'api' }
  }

  const subject = `Portfolio enquiry from ${name}`
  const body = `${message}\n\n— ${name} (${email})`
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
