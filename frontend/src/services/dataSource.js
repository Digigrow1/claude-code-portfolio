import staticPortfolio from '../data/portfolio.json'
import { config } from './config'
import { apiRequest } from './apiClient'

// Components never import portfolio.json directly; they go through here so the
// content source can move to the API without touching the UI.

export function getInitialPortfolio() {
  return config.dataSource === 'static' ? staticPortfolio : null
}

export async function getPortfolio() {
  if (config.dataSource !== 'api') return staticPortfolio

  try {
    return await apiRequest('/portfolio')
  } catch (error) {
    // Keep the site up if the API is down: fall back to the bundled content.
    console.warn('Portfolio API unavailable, using bundled content.', error)
    return staticPortfolio
  }
}
