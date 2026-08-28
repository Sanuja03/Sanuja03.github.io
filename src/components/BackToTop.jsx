import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [footerOffset, setFooterOffset] = useState(24)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const scrollTop = window.scrollY
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight

      const percentage =
        scrollable > 0
          ? Math.min(scrollTop / scrollable, 1)
          : 0

      setProgress(percentage)
      setVisible(scrollTop > 450)

      const footer = document.querySelector('footer')

      if (footer) {
        const rect = footer.getBoundingClientRect()
        const overlap = window.innerHeight - rect.top

        setFooterOffset(
          Math.max(24, overlap > 0 ? overlap + 24 : 24)
        )
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    const onResize = () => update()

    window.addEventListener('scroll', onScroll, {
      passive: true,
    })

    window.addEventListener('resize', onResize)

    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const circumference = 2 * Math.PI * 21
  const offset =
    circumference - progress * circumference

  return (
    <button
      className={`back-to-top ${
        visible ? 'visible' : ''
      }`}
      onClick={goToTop}
      style={{
        bottom: `${footerOffset}px`,
      }}
      aria-label="Back to top"
    >
      <svg
        className="back-to-top-ring"
        viewBox="0 0 52 52"
        aria-hidden="true"
      >
        <circle
          className="back-to-top-track"
          cx="26"
          cy="26"
          r="21"
        />

        <circle
          className="back-to-top-progress"
          cx="26"
          cy="26"
          r="21"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>

      <ArrowUp size={17} />
    </button>
  )
}