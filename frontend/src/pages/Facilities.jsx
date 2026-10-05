import { useEffect, useState } from 'react'
import { getFacilities } from '../services/api'

function Facilities() {
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getFacilities()
      .then(res => setFacilities(res.data))
      .catch(() => setError('Could not load facilities.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1>Facilities</h1>
      {loading && <p>Loading facilities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && facilities.length === 0 && <p>No facilities found.</p>}
      <div className="card-grid">
        {facilities.map(f => (
          <div key={f.id} className="card">
            <h3>{f.name}</h3>
            <p>{f.description}</p>
            <p><strong>Location:</strong> {f.location}</p>
            <p><strong>Hours:</strong> {f.openingHours}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Facilities
