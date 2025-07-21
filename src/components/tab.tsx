import Link from 'next/link'
import React from 'react'

export default function Tab() {
  return (
    <div className="sticky top-0 flex flex-col gap-4">
        <Link href={"/"} className="font-bold text-gray-800 text-xl">
            <p className="">Home</p>
        </Link>
        {/* <Link href={"/pouch"} className="font-bold text-xl">
          <p className="text-gray-800">Pouch Inventory Sytem</p>
        </Link>
        <Link href={"/something"} className="font-bold text-xl">
          <p className="text-gray-800">AWB Inventory Sytem</p>
        </Link>
        <Link href={"/something"} className="font-bold text-xl">
          <p className="text-gray-800">Payroll System</p>
        </Link>

        <Link href={"/something"} className="font-bold text-xl">
          <p className="text-gray-800">Something</p>
        </Link> */}
    </div>
  )
}
