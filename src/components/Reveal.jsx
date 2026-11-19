import { useEffect, useRef } from 'react'

// Fades content in once, the first time it scrolls into view.
export default function Reveal({ as: Tag = 'div', children, className = '', ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (!('IntersectionObserver' in window)) {
      element.classList.add('shown')
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('shown')
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}
