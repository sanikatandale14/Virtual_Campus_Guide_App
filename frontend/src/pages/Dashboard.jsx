import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../services/auth'
import { getAnnouncements } from '../services/api'

function Dashboard() {
  const user = getUser()
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    getAnnouncements().then(res => setAnnouncements(res.data.slice(0, 5))).catch(() => setAnnouncements([]))
  }, [])

  return (
    <div>
      <h1>Welcome, {user?.name} 👋</h1>
      <p>You are logged in as <strong>{user?.role}</strong>.</p>

      <h2>Quick Links</h2>
      <div className="quick-links">
        <Link to="/locations" className="btn">📍 Locations</Link>
        <Link to="/departments" className="btn">🏫 Departments</Link>
        <Link to="/facilities" className="btn">🏋️ Facilities</Link>
        <Link to="/events" className="btn">🎉 Events</Link>
        <Link to="/map" className="btn">🗺️ Campus Map</Link>
      </div>

      <h2>Latest Announcements</h2>
      {announcements.length === 0 && <p>No announcements right now.</p>}
      <div className="card-grid">
        {announcements.map(a => (
          <div key={a.id} className="card">
            <h3>{a.title}</h3>
            <p>{a.message}</p>
            <p className="hint">{a.date} — {a.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
