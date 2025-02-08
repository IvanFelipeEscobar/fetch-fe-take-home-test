'use client'

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import LogoutButton from '../../components/logout-btn'
import DogCard from '@/components/dog-card'

interface Dog {
  id: string
  img: string
  name: string
  breed: string
}

export default function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState('')
  const [dogs, setDogs] = useState<Dog[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const { data } = await axios.get(
          'https://frontend-take-home-service.fetch.com/dogs/breeds',
          { withCredentials: true }
        )
        setBreeds(data)
      } catch (error) {
        console.error('Error fetching breeds:', error)
      }
    }

    fetchBreeds()
  }, [])

  const fetchDogs = useCallback(async () => {
    if (!selectedBreed) return

    try {
      const res = await axios.get(
        'https://frontend-take-home-service.fetch.com/dogs/search',
        {
          params: { breeds: selectedBreed, size: 10, from: (page - 1) * 10 },
          withCredentials: true,
        }
      )

      setDogs(res.data.result)
    } catch (error) {
      console.error('Error fetching dogs:', error)
    }
  }, [selectedBreed, page]) 

  useEffect(() => {
    fetchDogs()
  }, [fetchDogs])

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-between w-full max-w-4xl mb-4">
        <h1 className="text-2xl font-bold">Dog Search</h1>
        <LogoutButton />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium">Select a Breed:</label>
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => fetchDogs()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>

      <div className="flex justify-between w-full max-w-4xl mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded ${
            page === 1
              ? 'bg-gray-300'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  )
}
