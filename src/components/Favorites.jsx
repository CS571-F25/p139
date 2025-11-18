import { useCallback, useMemo } from 'react'
import { Container, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import FavoritesPanel from './FavoritesPanel'

import { posts } from '../data/posts'
import useFavorites from '../hooks/useFavorites'

export default function Favorites () {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()

  const postsMap = useMemo(() => new Map(posts.map((post) => [post.slug, post])), [])

  const handleNavigatePost = useCallback((slug) => {
    navigate(`/post/${slug}`)
  }, [navigate])

  const handleNavigateHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <Container fluid className="home-shell py-4">
      <Stack gap={4}>
        <header className="home-hero">
          <p className="eyebrow text-uppercase">Saved Adventures</p>
          <h1>Your Favorites</h1>
          <p className="lead mb-0">
            Review the trips you pinned and jump back into the full stories whenever you like.
          </p>
        </header>

        <FavoritesPanel
          favorites={favorites}
          postsMap={postsMap}
          onNavigatePost={handleNavigatePost}
          onNavigateHome={handleNavigateHome}
          onToggleFavorite={toggleFavorite}
        />
      </Stack>
    </Container>
  )
}
