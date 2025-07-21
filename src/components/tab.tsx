import Link from 'next/link'
import React from 'react'

export default function Tab() {
  return (
    <div className="p-4">
        <Link href={"/"} className="font-bold text-xl">
            <p className="">Home</p>
        </Link>
    </div>
  )
}
