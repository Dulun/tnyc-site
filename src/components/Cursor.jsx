import { useEffect, useRef, useState } from 'react'

// A dot that tracks the pointer exactly and a ring that trails it.
// The ring morphs depending on what it hovers: links, text inputs, or the ASCII field.
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    const root = document.documentElement
    root.classList.add('has-cursor')

    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let mode = ''
    let visible = false
    let raf = 0

    const setVisible = (v) => {
      visible = v
      dot.classList.toggle('is-visible', v)
      ring.classList.toggle('is-visible', v)
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!visible) {
        rx = x
        ry = y
        setVisible(true)
      }
      const target = e.target instanceof Element ? e.target.closest('[data-cursor], a, button, input, textarea') : null
      let next = ''
      if (target) {
        if (target.dataset.cursor) next = target.dataset.cursor
        else if (target.matches('input, textarea')) next = 'text'
        else next = 'link'
      }
      if (next !== mode) {
        mode = next
        ring.dataset.mode = mode
        dot.dataset.mode = mode
      }
    }
    const onOut = (e) => {
      if (!e.relatedTarget) setVisible(false)
    }

    const loop = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseout', onOut)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseout', onOut)
      root.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={ringRef} className="cursor-layer cursor-ring" aria-hidden="true">
        <span />
      </div>
      <div ref={dotRef} className="cursor-layer cursor-dot" aria-hidden="true">
        <span />
      </div>
    </>
  )
}
