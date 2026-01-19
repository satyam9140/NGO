import React, { createContext, useState, useEffect } from 'react'
import { me } from '../api/auth.api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token')
      if (!token) return
      try {
        const { data } = await me()
        setUser(data)
      } catch {
        localStorage.removeItem('token')
      }
    })()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}