import Link from "next/link"

export default function SOMETHING() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <p className="font-bold text-center text-7xl mb-6">🚧 Coming Soon!</p>
      <Link 
        href="/" 
        className="text-blue-500 hover:text-blue-700 font-bold text-4xl transition"
      >
        Back
      </Link>
    </div>
  )
}
