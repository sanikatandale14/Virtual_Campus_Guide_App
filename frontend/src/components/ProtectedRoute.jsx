import { Navigate } from 'react-router-dom'
import { getUser } from '../services/auth'

function ProtectedRoute({ children, adminOnly }) {
  const user = getUser()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (adminOnly && user.role !== 'ADMIN') {
    return <p className="error">Admin access required. You are logged in as {user.role}.</p>
  }
  return children
}

export default ProtectedRoute
