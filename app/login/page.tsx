'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import Image from 'next/image'
import dog from '@/public/rottie.jpg'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/auth/login',
        { name, email },
        { withCredentials: true }
      )
      if (response.status === 200) {
        useAuthStore.getState().setAuthenticated(true) 
      }
      router.push('/search')
    } catch (err) {
      console.error(err)
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <Image
        src={dog}
        alt='Photo of a dog'
        className='rounded-3xl mb-4 h-60 object-cover object-top'
        priority
        />
        <h1 className="text-2xl font-bold text-orange-400 mb-4 text-center">
          Login
        </h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
          id="login-form"
        >
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded text-blue-900"
            required
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded text-blue-900"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded hover:bg-orange-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
