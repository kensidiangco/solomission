import Link from "next/link"

export default function SOMETHING() {
  return (
    <div className="p-100">
      <p className="font-bold text-center text-7xl mb-5">SOMETHING!</p>
      <Link href={"/"} className="font-bold text-center text-4xl">
        <p className="text-blue-400">Back!</p>
      </Link>
      
    </div>
  )
}
