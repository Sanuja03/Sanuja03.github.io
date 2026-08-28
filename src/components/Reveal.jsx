import { useEffect, useRef } from 'react'

export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        ref.current?.classList.toggle('shown', entry.isIntersecting)
      },
      {
        threshold: 0.12,
      }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}