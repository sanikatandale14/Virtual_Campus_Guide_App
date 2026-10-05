import { useEffect, useState } from 'react'
import { getEvents } from '../services/api'

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getEvents()
      .then(res => setEvents(res.data))
      .catch(() => setError('Could not load events.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1>Upcoming Events</h1>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && events.length === 0 && <p>No events found.</p>}
      <div className="card-grid">
        {events.map(ev => (
          <div key={ev.id} className="card">
            <h3>{ev.name}</h3>
            <p>{ev.description}</p>
            <p><strong>Date:</strong> {ev.date}</p>
            <p><strong>Time:</strong> {ev.time}</p>
            <p><strong>Venue:</strong> {ev.venue}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events
