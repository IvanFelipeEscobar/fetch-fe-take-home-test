import axios from 'axios'
import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  setAuthenticated: (auth: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
  logout: async () => {
    await axios.post(
      'https://frontend-take-home-service.fetch.com/auth/logout',
      {},
      { withCredentials: true }
    )
    set({ isAuthenticated: false })
  },
}))
