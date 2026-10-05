import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getLocations, searchLocations } from '../services/api'

function Locations() {
  const [locations, setLocations] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const q = searchParams.get('search')
    setSearch(q || '')
    fetchData(q || '')
  }, [searchParams])

  const fetchData = (q) => {
    setLoading(true)
    setError('')
    const request = q ? searchLocations(q) : getLocations()
    request
      .then(res => setLocations(res.data))
      .catch(() => setError('Could not load locations. Is the backend running?'))
      .finally(() => setLoading(false))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      fetchData(search.trim())
    } else {
      fetchData('')
    }
  }

  return (
    <div>
      <h1>Campus Locations</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" className="btn-secondary" onClick={() => { setSearch(''); fetchData('') }}>Clear</button>
      </form>

      {loading && <p>Loading locations...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && locations.length === 0 && <p>No locations found.</p>}

      <div className="card-grid">
        {locations.map(loc => (
          <div key={loc.id} className="card">
            <h3>{loc.name}</h3>
            <p className="tag">{loc.category}</p>
            <p>{loc.description}</p>
            <p><strong>Building:</strong> {loc.building}</p>
            <p><strong>Hours:</strong> {loc.openingHours}</p>
            <Link to={`/locations/${loc.id}`} className="btn btn-small">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Locations
