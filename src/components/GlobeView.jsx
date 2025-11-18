import { useEffect, useMemo, useRef } from 'react'
import maplibregl from 'maplibre-gl'

const MAP_STYLE = 'https://demotiles.maplibre.org/globe.json'

export default function GlobeView ({ features, selectedSlug, onSelect }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  const selectedFeature = useMemo(
    () => features.find((feature) => feature.properties.slug === selectedSlug),
    [features, selectedSlug]
  )

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const mapInstance = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: [0, 20],
      zoom: 1.4,
      antialias: true
    })

    mapInstance.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-left')
    mapInstance.dragRotate.enable()
    mapInstance.touchZoomRotate.enableRotation(true)

    mapInstance.on('style.load', () => {
      mapInstance.setProjection({
        type: 'globe'
      })
      mapInstance.setFog({
        color: 'rgba(8, 47, 73, 0.25)',
        'horizon-blend': 0.3
      })
    })

    mapRef.current = mapInstance
    requestAnimationFrame(() => mapInstance.resize())

    return () => {
      markersRef.current.forEach(({ marker }) => marker.remove())
      markersRef.current = []
      mapInstance.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach(({ marker }) => marker.remove())
    markersRef.current = features.map((feature) => {
      const { slug, title } = feature.properties
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'globe-pin'
      button.title = title
      button.setAttribute('aria-label', `Select ${title}`)
      button.addEventListener('click', () => onSelect(slug))
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(slug)
        }
      })

      const marker = new maplibregl.Marker({ element: button, anchor: 'center' })
        .setLngLat(feature.geometry.coordinates)
        .addTo(mapRef.current)

      return { marker, slug, element: button }
    })

    return () => {
      markersRef.current.forEach(({ marker }) => marker.remove())
      markersRef.current = []
    }
  }, [features, onSelect])

  useEffect(() => {
    markersRef.current.forEach(({ slug, element }) => {
      if (!element) return
      element.classList.toggle('globe-pin--active', slug === selectedSlug)
    })
  }, [selectedSlug])

  useEffect(() => {
    if (!mapRef.current || !selectedFeature) return
    mapRef.current.flyTo({
      center: selectedFeature.geometry.coordinates,
      zoom: 2.2,
      speed: 0.6,
      curve: 1.4,
      essential: true
    })
  }, [selectedFeature])

  return (
    <section aria-label="3D globe view" className="map-view">
      <div className="map-view__header">
        <h3>3D Globe</h3>
        <p>Spin around to get a sense of distance and daylight.</p>
      </div>
      <div ref={containerRef} className="globe-map" />
    </section>
  )
}
