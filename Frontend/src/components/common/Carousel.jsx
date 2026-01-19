import React, { useState, useEffect } from 'react'

export default function Carousel({ images = [], interval = 4000, height = 320 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    const t = setInterval(() => setIndex(i => (i + 1) % images.length), interval)
    return () => clearInterval(t)
  }, [images, interval])

  if (!images || images.length === 0) return null

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 8,
      height,
      background: '#f3f3f3'
    }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`carousel-${i}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            transition: 'opacity 600ms ease',
            opacity: i === index ? 1 : 0,
            pointerEvents: i === index ? 'auto' : 'none'
          }}
        />
      ))}

      <div style={{
        position: 'absolute',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: 'none',
              background: i === index ? '#fff' : 'rgba(255,255,255,0.6)',
              boxShadow: '0 0 4px rgba(0,0,0,0.25)',
              cursor: 'pointer',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  )
}