// Single place that reads build-time env. Phase flags (see decision/0003):
//   VITE_DATA_SOURCE   static | api    -> where portfolio content comes from
//   VITE_CONTACT_MODE  mailto | api    -> how the contact form is delivered
//   VITE_API_BASE_URL  default /api    -> same-origin path proxied by nginx
const env = import.meta.env

export const config = Object.freeze({
  dataSource: env.VITE_DATA_SOURCE === 'api' ? 'api' : 'static',
  contactMode: env.VITE_CONTACT_MODE === 'api' ? 'api' : 'mailto',
  apiBaseUrl: (env.VITE_API_BASE_URL || '/api').replace(/\/+$/, ''),
})
