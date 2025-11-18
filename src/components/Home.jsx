import { useCallback, useMemo, useState } from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import MapToggle from './MapToggle'
import GlobeView from './GlobeView'
import Map2DView from './Map2DView'
import PinPopover from './PinPopover'

import { locationFeatures } from '../data/locations'
import { posts } from '../data/posts'
import useFavorites from '../hooks/useFavorites'

export default function Home () {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('globe')
  const [selectedSlug, setSelectedSlug] = useState(locationFeatures[0]?.properties.slug ?? null)

  const { toggleFavorite, isFavorite } = useFavorites()

  const postsMap = useMemo(() => new Map(posts.map((post) => [post.slug, post])), [])
  const selectedFeature = useMemo(
    () => locationFeatures.find((feature) => feature.properties.slug === selectedSlug),
    [selectedSlug]
  )

  const selectedPost = selectedSlug ? postsMap.get(selectedSlug) : undefined

  const handleSelectPin = useCallback((slug) => {
    setSelectedSlug(slug)
  }, [])

  const handleNavigatePost = useCallback(
    (slug) => {
      navigate(`/post/${slug}`)
    },
    [navigate]
  )

  return (
    <Container fluid className="home-shell py-4">
      <Stack gap={4}>
        <header className="home-hero">
          <p className="eyebrow text-uppercase">Travel Journal Explorer</p>
          <div>
            <h1>Travel Tracker</h1>
            <p className="lead mb-3">
              Plotting the stories behind my favorite journeys. Tap pins to preview a memory, then deep dive into the full
              journal entry.
            </p>
            <MapToggle value={viewMode} onChange={setViewMode} />
          </div>
        </header>

        <Row className="g-4 align-items-start">
          <Col>
            <div className="map-stack">
              {viewMode === 'globe' ? (
                <GlobeView features={locationFeatures} selectedSlug={selectedSlug} onSelect={handleSelectPin} />
              ) : (
                <Map2DView features={locationFeatures} selectedSlug={selectedSlug} onSelect={handleSelectPin} />
              )}
              <PinPopover
                feature={selectedFeature}
                post={selectedPost}
                onNavigatePost={handleNavigatePost}
                onToggleFavorite={toggleFavorite}
                isFavorite={selectedSlug ? isFavorite(selectedSlug) : false}
              />
            </div>
          </Col>
        </Row>
      </Stack>
    </Container>
  )
}
