import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getLocations } from '../services/api'

function Home() {
  const [locations, setLocations] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getLocations()
      .then(res => setLocations(res.data.slice(0, 4)))
      .catch(() => setLocations([]))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/locations?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <div>
      <section className="hero">
        <h1>Welcome to ABC College Campus</h1>
        <p>Find buildings, departments, facilities and events easily. Explore the campus with the Virtual Campus Guide!</p>
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search a location, e.g. Library"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <h2>Popular Locations</h2>
      <div className="card-grid">
        {locations.map(loc => (
          <Link to={`/locations/${loc.id}`} key={loc.id} className="card link-card">
            <h3>{loc.name}</h3>
            <p className="tag">{loc.category}</p>
            <p>{loc.description}</p>
          </Link>
        ))}
      </div>

      <h2>Quick Links</h2>
      <div className="quick-links">
        <Link to="/locations" className="btn">📍 Locations</Link>
        <Link to="/departments" className="btn">🏫 Departments</Link>
        <Link to="/facilities" className="btn">🏋️ Facilities</Link>
        <Link to="/events" className="btn">🎉 Events</Link>
      </div>
    </div>
  )
}

export default Home
