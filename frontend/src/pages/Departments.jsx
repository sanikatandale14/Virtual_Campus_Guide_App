import { useEffect, useState } from 'react'
import { getDepartments } from '../services/api'

function Departments() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getDepartments()
      .then(res => setDepartments(res.data))
      .catch(() => setError('Could not load departments.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1>Departments</h1>
      {loading && <p>Loading departments...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && departments.length === 0 && <p>No departments found.</p>}
      <div className="card-grid">
        {departments.map(dep => (
          <div key={dep.id} className="card">
            <h3>{dep.name}</h3>
            <p>{dep.description}</p>
            <p><strong>HOD:</strong> {dep.hod}</p>
            <p><strong>Building:</strong> {dep.building}</p>
            <p><strong>Email:</strong> {dep.contactEmail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Departments
