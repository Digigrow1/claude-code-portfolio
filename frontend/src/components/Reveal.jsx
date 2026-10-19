import { useReveal } from '../hooks/useReveal'

export default function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal()
  const Tag = as
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
