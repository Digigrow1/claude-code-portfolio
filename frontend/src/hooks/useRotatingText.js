import { useEffect, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useRotatingText(items, intervalMs = 2600) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!items?.length || items.length < 2 || prefersReducedMotion()) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs)
    return () => clearInterval(id)
  }, [items, intervalMs])

  return items?.[index] ?? ''
}
