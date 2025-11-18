import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'

const createIcon = (isActive) =>
  L.divIcon({
    className: `leaflet-pin-icon${isActive ? ' leaflet-pin-icon--active' : ''}`,
    html: '<span class="leaflet-pin-icon__dot"></span>',
    iconSize: [32, 32],
    iconAnchor: [16, 28]
  })

const defaultIcon = createIcon(false)
const activeIcon = createIcon(true)

function MapFocus ({ position }) {
  const map = useMap()

  useEffect(() => {
    if (!map || !position) return
    const targetZoom = Math.max(map.getZoom(), 3)
    map.flyTo(position, targetZoom, { duration: 1.2 })
  }, [map, position])

  return null
}

export default function Map2DView ({ features, selectedSlug, onSelect }) {
  const markers = useMemo(
    () =>
      features.map((feature) => {
        const { slug, title } = feature.properties
        const [lng, lat] = feature.geometry.coordinates
        return {
          slug,
          title,
          position: [lat, lng]
        }
      }),
    [features]
  )

  const selectedMarker = selectedSlug ? markers.find((marker) => marker.slug === selectedSlug) : undefined
  const defaultCenter = selectedMarker?.position ?? [25, 10]

  return (
    <section aria-label="2D world map view" className="map-view">
      <div className="map-view__header">
        <h3>2D Explorer</h3>
        <p>Great for quick orientation and precise pin placement.</p>
      </div>
      <MapContainer
        className="leaflet-map"
        center={defaultCenter}
        zoom={selectedMarker ? 4 : 2}
        minZoom={2}
        maxZoom={7}
        worldCopyJump
        scrollWheelZoom
        preferCanvas
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.slug}
            position={marker.position}
            icon={marker.slug === selectedSlug ? activeIcon : defaultIcon}
            eventHandlers={{
              click: () => onSelect(marker.slug)
            }}
          >
            <Tooltip direction="top" offset={[0, -12]} opacity={0.9} permanent={marker.slug === selectedSlug}>
              {marker.title}
            </Tooltip>
          </Marker>
        ))}
        {selectedMarker && <MapFocus position={selectedMarker.position} />}
      </MapContainer>
    </section>
  )
}
