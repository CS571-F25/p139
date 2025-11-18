import geoJsonText from './locations.geojson?raw'

export const locationsGeoJson = JSON.parse(geoJsonText)
export const locationFeatures = locationsGeoJson.features
