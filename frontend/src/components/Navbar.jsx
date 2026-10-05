import { Link, NavLink, useNavigate } from 'react-router-dom'
import { clearUser, getUser } from '../services/auth'

function Navbar() {
  const navigate = useNavigate()
  const user = getUser()

  const handleLogout = () => {
    clearUser()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">🎓 Virtual Campus Guide</Link>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/locations">Locations</NavLink>
        <NavLink to="/departments">Departments</NavLink>
        <NavLink to="/facilities">Facilities</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/announcements">Announcements</NavLink>
        <NavLink to="/map">Map</NavLink>
        {user && <NavLink to="/dashboard">Dashboard</NavLink>}
        {user && user.role === 'ADMIN' && <NavLink to="/admin">Admin</NavLink>}
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/register">Register</NavLink>}
        {user && <button className="btn btn-small" onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  )
}

export default Navbar
