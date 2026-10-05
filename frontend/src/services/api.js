import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
})

// Attach the logged-in user's token to every request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// Auth
export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)
export const logout = () => api.post('/auth/logout')

// Locations
export const getLocations = () => api.get('/locations')
export const getLocationById = (id) => api.get(`/locations/${id}`)
export const searchLocations = (q) => api.get(`/locations?name=${encodeURIComponent(q)}`)
export const createLocation = (data) => api.post('/locations', data)
export const updateLocation = (id, data) => api.put(`/locations/${id}`, data)
export const deleteLocation = (id) => api.delete(`/locations/${id}`)

// Departments
export const getDepartments = () => api.get('/departments')
export const getDepartmentById = (id) => api.get(`/departments/${id}`)
export const createDepartment = (data) => api.post('/departments', data)
export const updateDepartment = (id, data) => api.put(`/departments/${id}`, data)
export const deleteDepartment = (id) => api.delete(`/departments/${id}`)

// Facilities
export const getFacilities = () => api.get('/facilities')
export const getFacilityById = (id) => api.get(`/facilities/${id}`)
export const createFacility = (data) => api.post('/facilities', data)
export const updateFacility = (id, data) => api.put(`/facilities/${id}`, data)
export const deleteFacility = (id) => api.delete(`/facilities/${id}`)

// Events
export const getEvents = () => api.get('/events')
export const getEventById = (id) => api.get(`/events/${id}`)
export const createEvent = (data) => api.post('/events', data)
export const updateEvent = (id, data) => api.put(`/events/${id}`, data)
export const deleteEvent = (id) => api.delete(`/events/${id}`)

// Announcements
export const getAnnouncements = () => api.get('/announcements')
export const createAnnouncement = (data) => api.post('/announcements', data)
export const updateAnnouncement = (id, data) => api.put(`/announcements/${id}`, data)
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`)

export default api
