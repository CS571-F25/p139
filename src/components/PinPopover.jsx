import { Badge, Button, Card, Stack } from 'react-bootstrap'

export default function PinPopover ({ feature, post, onNavigatePost, onToggleFavorite, isFavorite }) {
  if (!feature || !post) {
    return (
      <Card className="pin-popover">
        <Card.Body>
          <Card.Title>Choose a pin to get started</Card.Title>
          <Card.Text>Select a location on the map or globe to preview the journal entry.</Card.Text>
        </Card.Body>
      </Card>
    )
  }

  const { title } = feature.properties

  return (
    <Card className="pin-popover" aria-live="polite">
      <Card.Img variant="top" src={post.heroImage} alt={`${title} hero`} loading="lazy" />
      <Card.Body>
        <Stack gap={2}>
          <div className="d-flex align-items-center justify-content-between">
            <Card.Title className="mb-0">{post.title}</Card.Title>
            <Badge bg="secondary">{post.minutesToRead} min read</Badge>
          </div>
          <Card.Subtitle className="text-muted">{post.location}</Card.Subtitle>
          <Card.Text>{post.excerpt}</Card.Text>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={() => onNavigatePost(post.slug)}>
              Read journal
            </Button>
            <Button
              variant={isFavorite ? 'outline-danger' : 'outline-secondary'}
              onClick={() => onToggleFavorite(post.slug)}
              aria-pressed={isFavorite}
            >
              {isFavorite ? 'Remove favorite' : 'Save to favorites'}
            </Button>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  )
}
