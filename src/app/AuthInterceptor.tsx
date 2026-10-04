"use client"

import axios from 'axios'
import Cookies from 'js-cookie'

const ROOT_API = process.env.NEXT_PUBLIC_API || ''

// Registered once at module load so every axios call to the backend carries the login token,
// including the multipart store/update/upload requests that don't set headers themselves.
if (typeof window !== 'undefined' && !(window as any).__authInterceptor) {
  (window as any).__authInterceptor = true

  axios.interceptors.request.use((config) => {
    const token = Cookies.get('token')
    if (token && config.url?.startsWith(ROOT_API)) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
    }
    return config
  })

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const url: string = error?.config?.url || ''
      const isLogin = url.endsWith('/login')
      if (error?.response?.status === 401 && !isLogin && url.startsWith(ROOT_API)) {
        Cookies.remove('token')
        if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    }
  )
}

export default function AuthInterceptor() {
  return null
}
