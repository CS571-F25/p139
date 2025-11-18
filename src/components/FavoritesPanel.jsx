import { Badge, Button, Card, Stack } from 'react-bootstrap'

export default function FavoritesPanel ({ favorites, postsMap, onNavigatePost, onNavigateHome, onToggleFavorite }) {
  const favoritePosts = favorites
    .map((slug) => postsMap.get(slug))
    .filter(Boolean)

  return (
    <Card className="favorites-panel">
      <Card.Body>
        <Stack gap={3}>
          <div>
            <Card.Title>Favorites</Card.Title>
            <Card.Text className="text-muted mb-0">
              Quick access to the places you marked while exploring the map.
            </Card.Text>
          </div>
          {favoritePosts.length === 0 && (
            <div className="text-center py-4">
              <p className="mb-2">No favorites yet.</p>
              <Button variant="link" onClick={onNavigateHome}>
                Head back to the map
              </Button>
            </div>
          )}
          {favoritePosts.map((post) => (
            <Card key={post.slug} className="favorite-card">
              <Card.Body className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <Card.Title as="h4" className="mb-0 fs-5">
                      {post.title}
                    </Card.Title>
                    <Badge bg="info" text="dark">
                      {post.location.split(', ')[0]}
                    </Badge>
                  </div>
                  <Card.Text className="text-muted small mb-2">{post.date}</Card.Text>
                  <Card.Text className="mb-0">{post.excerpt}</Card.Text>
                </div>
                <Stack gap={2} className="align-items-end">
                  <Button size="sm" variant="outline-primary" onClick={() => onNavigatePost(post.slug)}>
                    View
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => onToggleFavorite(post.slug)}>
                    Remove
                  </Button>
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </Stack>
      </Card.Body>
    </Card>
  )
}
