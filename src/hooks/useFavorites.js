import { useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'travel-tracker-favorites'

const readStorage = () => {
  if (typeof window === 'undefined') return []
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function useFavorites () {
  const [favorites, setFavorites] = useState(readStorage)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Ignore quota errors silently
    }
  }, [favorites])

  const addFavorite = useCallback((slug) => {
    setFavorites((prev) => (prev.includes(slug) ? prev : [...prev, slug]))
  }, [])

  const removeFavorite = useCallback((slug) => {
    setFavorites((prev) => prev.filter((item) => item !== slug))
  }, [])

  const toggleFavorite = useCallback((slug) => {
    setFavorites((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]))
  }, [])

  const isFavorite = useCallback((slug) => favorites.includes(slug), [favorites])

  return useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite
    }),
    [favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite]
  )
}
