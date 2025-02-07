'use client'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <button onClick={handleLogout} className="text-red-500 hover:underline">
      Logout
    </button>
  )
}
