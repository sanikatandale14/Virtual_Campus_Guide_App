import { useEffect, useState } from 'react'
import { getAnnouncements } from '../services/api'

function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAnnouncements()
      .then(res => setAnnouncements(res.data))
      .catch(() => setError('Could not load announcements.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1>Announcements</h1>
      {loading && <p>Loading announcements...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && announcements.length === 0 && <p>No announcements yet.</p>}
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

export default Announcements
