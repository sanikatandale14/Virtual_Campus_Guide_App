import { useEffect, useState } from 'react'
import {
  getLocations, createLocation, updateLocation, deleteLocation,
  getDepartments, createDepartment, updateDepartment, deleteDepartment,
  getFacilities, createFacility, updateFacility, deleteFacility,
  getEvents, createEvent, updateEvent, deleteEvent,
  getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
} from '../services/api'

const emptyForms = {
  locations: { name: '', category: '', description: '', building: '', floor: '', openingHours: '', contact: '', latitude: 0, longitude: 0 },
  departments: { name: '', description: '', hod: '', building: '', contactEmail: '' },
  facilities: { name: '', description: '', location: '', openingHours: '' },
  events: { name: '', description: '', date: '', time: '', venue: '' },
  announcements: { title: '', message: '', date: '', author: '' },
}

const fields = {
  locations: ['name', 'category', 'description', 'building', 'floor', 'openingHours', 'contact', 'latitude', 'longitude'],
  departments: ['name', 'description', 'hod', 'building', 'contactEmail'],
  facilities: ['name', 'description', 'location', 'openingHours'],
  events: ['name', 'description', 'date', 'time', 'venue'],
  announcements: ['title', 'message', 'date', 'author'],
}

const api = {
  locations: { get: getLocations, create: createLocation, update: updateLocation, remove: deleteLocation },
  departments: { get: getDepartments, create: createDepartment, update: updateDepartment, remove: deleteDepartment },
  facilities: { get: getFacilities, create: createFacility, update: updateFacility, remove: deleteFacility },
  events: { get: getEvents, create: createEvent, update: updateEvent, remove: deleteEvent },
  announcements: { get: getAnnouncements, create: createAnnouncement, update: updateAnnouncement, remove: deleteAnnouncement },
}

const titles = {
  locations: ['Main Gate', 'category'], // used for list row display
}

function AdminDashboard() {
  const [tab, setTab] = useState('locations')
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForms.locations)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    setError('')
    api[tab].get()
      .then(res => setItems(res.data))
      .catch(() => setError(`Could not load ${tab}.`))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setForm(emptyForms[tab])
    setEditingId(null)
    setMessage('')
    setError('')
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    // simple validation: first two fields must be non-empty
    const required = fields[tab].slice(0, 2)
    if (required.some(f => !String(form[f]).trim())) {
      setError('Please fill in all required fields.')
      return
    }
    const request = editingId ? api[tab].update(editingId, form) : api[tab].create(form)
    request
      .then(() => {
        setMessage(editingId ? 'Updated successfully!' : 'Added successfully!')
        setForm(emptyForms[tab])
        setEditingId(null)
        load()
      })
      .catch(err => setError(err.response?.data?.message || 'Operation failed. Admin only.'))
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({ ...emptyForms[tab], ...item })
    window.scrollTo(0, 0)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    api[tab].remove(id)
      .then(() => { setMessage('Deleted successfully!'); load() })
      .catch(err => setError(err.response?.data?.message || 'Delete failed. Admin only.'))
  }

  const rowLabel = (item) => item.name || item.title || `#${item.id}`

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div className="tabs">
        {Object.keys(api).map(key => (
          <button key={key} className={tab === key ? 'btn' : 'btn btn-secondary'} onClick={() => setTab(key)}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="card form-card">
        <h2>{editingId ? `Edit ${tab.slice(0, -1)}` : `Add ${tab.slice(0, -1)}`}</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {fields[tab].map(f => (
            <div key={f}>
              <label>{f}</label>
              {f === 'description' || f === 'message' ? (
                <textarea value={form[f] ?? ''} onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
              ) : (
                <input
                  type={f === 'latitude' || f === 'longitude' ? 'number' : 'text'}
                  step={f === 'latitude' || f === 'longitude' ? '0.00001' : undefined}
                  value={form[f] ?? ''}
                  onChange={(e) => setForm({ ...form, [f]: f === 'latitude' || f === 'longitude' ? Number(e.target.value) : e.target.value })}
                />
              )}
            </div>
          ))}
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); setForm(emptyForms[tab]) }}>Cancel</button>}
        </form>
      </div>

      <h2>All {tab}</h2>
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>No {tab} found.</p>}
      <div className="card-grid">
        {items.map(item => (
          <div key={item.id} className="card">
            <h3>{rowLabel(item)}</h3>
            <p>{item.description || item.message}</p>
            <button className="btn btn-small" onClick={() => handleEdit(item)}>Edit</button>{' '}
            <button className="btn btn-small btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
