import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function useFetch(endpoint) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(endpoint)
        setData(res.data)
      } finally {
        setLoading(false)
      }
    })()
  }, [endpoint])
  return { data, loading }
}