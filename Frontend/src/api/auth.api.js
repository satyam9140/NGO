import api from './axios'

export const login = (credentials) => api.post('/auth/login', credentials)
export const register = (payload) => api.post('/auth/register', payload)
export const me = () => api.get('/auth/me')