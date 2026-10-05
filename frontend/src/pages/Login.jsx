import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api'
import { saveUser } from '../services/auth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    login({ email: email.trim(), password })
      .then(res => {
        saveUser(res.data)
        navigate(res.data.role === 'ADMIN' ? '/admin' : '/dashboard')
      })
      .catch(err => setError(err.response?.data?.message || 'Invalid email or password.'))
      .finally(() => setLoading(false))
  }

  return (
    <div className="card form-card">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@college.edu" />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <p>New here? <Link to="/register">Register</Link></p>
      <p className="hint">Admin: admin@college.com / admin123</p>
      <p className="hint">Student: student@college.com / student123</p>
    </div>
  )
}

export default Login
