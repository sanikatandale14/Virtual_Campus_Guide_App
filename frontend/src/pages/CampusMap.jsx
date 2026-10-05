import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import L from 'leaflet'
import { getLocations } from '../services/api'

// Haversine formula: distance between two latitude/longitude points in km
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

function CampusMap() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef(L.layerGroup())
  const routeRef = useRef(null)
  const [locations, setLocations] = useState([])
  const [sourceId, setSourceId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [routeInfo, setRouteInfo] = useState(null)
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams()

  // Create the map once
  useEffect(() => {
    if (mapInstance.current) return
    mapInstance.current = L.map(mapRef.current).setView([18.5209, 73.8575], 17)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance.current)
    markersRef.current.addTo(mapInstance.current)

    getLocations()
      .then(res => {
        setLocations(res.data)
        res.data.forEach(loc => {
          if (loc.latitude && loc.longitude) {
            L.marker([loc.latitude, loc.longitude])
              .addTo(markersRef.current)
              .bindPopup(`<b>${loc.name}</b><br/>${loc.category}<br/>${loc.building}, ${loc.floor || ''}`)
          }
        })
        const focusId = searchParams.get('focus')
        if (focusId) {
          const loc = res.data.find(l => String(l.id) === focusId)
          if (loc) mapInstance.current.setView([loc.latitude, loc.longitude], 18)
        }
      })
      .catch(() => setError('Could not load locations. Is the backend running?'))

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Draw route when both source and destination are selected
  useEffect(() => {
    if (routeRef.current) {
      routeRef.current.remove()
      routeRef.current = null
    }
    setRouteInfo(null)
    if (!sourceId || !destinationId || sourceId === destinationId) return

    const source = locations.find(l => String(l.id) === sourceId)
    const destination = locations.find(l => String(l.id) === destinationId)
    if (!source || !destination) return

    const distance = haversineKm(source.latitude, source.longitude, destination.latitude, destination.longitude)
    const walkingMinutes = (distance / 5) * 60 // 5 km/h walking speed

    routeRef.current = L.polyline(
      [[source.latitude, source.longitude], [destination.latitude, destination.longitude]],
      { color: 'blue', weight: 4 }
    ).addTo(mapInstance.current)

    mapInstance.current.fitBounds(routeRef.current.getBounds(), { padding: [40, 40] })
    setRouteInfo({ source: source.name, destination: destination.name, distance, walkingMinutes })
  }, [sourceId, destinationId, locations])

  return (
    <div>
      <h1>Campus Map</h1>
      {error && <p className="error">{error}</p>}

      <div className="route-selector">
        <select value={sourceId} onChange={(e) => setSourceId(e.target.value)}>
          <option value="">Select Source</option>
          {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <select value={destinationId} onChange={(e) => setDestinationId(e.target.value)}>
          <option value="">Select Destination</option>
          {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <button className="btn btn-secondary" onClick={() => { setSourceId(''); setDestinationId('') }}>Clear Route</button>
      </div>

      {routeInfo && (
        <div className="card route-info">
          <p><strong>Route:</strong> {routeInfo.source} → {routeInfo.destination}</p>
          <p><strong>Distance:</strong> {routeInfo.distance.toFixed(2)} km</p>
          <p><strong>Estimated walking time:</strong> {routeInfo.walkingMinutes.toFixed(1)} minutes (at 5 km/h)</p>
        </div>
      )}

      <div ref={mapRef} className="map"></div>
    </div>
  )
}

export default CampusMap
