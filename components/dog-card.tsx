import Image from "next/image"

interface DogCardProps {
  dog: {
    id: string
    img: string
    name: string
    breed: string
  }
}

export default function DogCard({ dog }: DogCardProps) {
  return (
    <div className="border rounded-lg p-2">
      <Image
        src={dog.img}
        alt={dog.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold">{dog.name}</h3>
      <p className="text-gray-600">{dog.breed}</p>
    </div>
  )
}
