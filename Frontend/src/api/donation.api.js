import api from './axios'

export const createDonation = (payload) => api.post('/donations', payload)
export const listDonations = () => api.get('/donations')
export const donationHistory = () => api.get('/donations/history')
export const getReceipt = (id) => api.get(`/donations/${id}/receipt`)