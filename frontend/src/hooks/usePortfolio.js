import { useEffect, useState } from 'react'
import { getInitialPortfolio, getPortfolio } from '../services/dataSource'

function initialState() {
  const data = getInitialPortfolio()
  return { data, error: null }
}

// Static mode resolves synchronously (no loading flash); API mode fetches once.
export function usePortfolio() {
  const [state, setState] = useState(initialState)
  const needsFetch = state.data === null && state.error === null

  useEffect(() => {
    if (!needsFetch) return
    let cancelled = false

    getPortfolio()
      .then((data) => !cancelled && setState({ data, error: null }))
      .catch((error) => !cancelled && setState({ data: null, error }))

    return () => {
      cancelled = true
    }
  }, [needsFetch])

  return { ...state, loading: needsFetch }
}
