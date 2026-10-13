import { useEffect, useState } from 'react'

/**
 * Types `text` character by character. Starts from an empty string.
 */
export function useTypewriter(text: string, speed = 35, startDelay = 0) {
  const [length, setLength] = useState(0)

  useEffect(() => {
    setLength(0)
    let interval: ReturnType<typeof setInterval> | undefined
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setLength(prev => {
          if (prev >= text.length) {
            if (interval) clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { typed: text.slice(0, length), done: length >= text.length }
}

export default useTypewriter
