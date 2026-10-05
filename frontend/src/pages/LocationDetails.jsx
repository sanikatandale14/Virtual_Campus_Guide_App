import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLocationById } from '../services/api'

function LocationDetails() {
  const { id } = useParams()
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getLocationById(id)
      .then(res => setLocation(res.data))
      .catch(err => {
        if (err.response && err.response.status === 404) {
          setError('Location not found.')
        } else {
          setError('Could not load location details.')
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>
  if (!location) return null

  return (
    <div className="card details">
      <h1>{location.name}</h1>
      <p className="tag">{location.category}</p>
      <p>{location.description}</p>
      <p><strong>Building:</strong> {location.building}</p>
      <p><strong>Floor:</strong> {location.floor}</p>
      <p><strong>Opening Hours:</strong> {location.openingHours}</p>
      <p><strong>Contact:</strong> {location.contact}</p>
      <Link to={`/map?focus=${location.id}`} className="btn">🗺️ Show on Map</Link>{' '}
      <Link to="/locations" className="btn btn-secondary">← Back to Locations</Link>
    </div>
  )
}

export default LocationDetails
