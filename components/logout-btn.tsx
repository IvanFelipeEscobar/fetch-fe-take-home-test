'use client'
import { useAuthStore } from '../store/auth-store'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    useAuthStore.getState().setAuthenticated(false) 
    router.push('/login')
  }

  return (
    <button onClick={handleLogout} className="text-red-500 hover:underline">
      Logout
    </button>
  )
}
