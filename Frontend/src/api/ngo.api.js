import api from './axios'

export const listNGOs = () => api.get('/ngos')
export const getNGO = (id) => api.get(`/ngos/${id}`)
export const createNGO = (formData) => api.post('/ngos', formData)
export const approveNGO = (id) => api.post(`/admin/ngos/${id}/approve`)