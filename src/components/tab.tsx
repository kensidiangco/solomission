import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

export default function Tab() {
  const pathname = usePathname();
  const showInventTab = pathname == '/pouch';

  return (
    <div className="sticky top-0 flex gap-4 px-8">
        <Link href={"/"} className="font-bold text-gray-800 text-xl">
            <p className="">Home</p>
        </Link>
        <Link href={"/pouch"} className="font-bold text-xl">
          <p className="text-gray-800">Pouch</p>
        </Link>

        {showInventTab && 
          <div className="flex gap-4 absolute right-0">
            <div className="flex gap-4 px-8">
              <Link href={"/pouch/invent"} className="font-bold text-xl">
                <p className="text-gray-800">Invent</p>
              </Link>
              
              <Link href={"/pouch/out"} className="font-bold text-xl">
                <p className="text-gray-800">Out</p>
              </Link>
            </div>
          </div>
        }
        {/* <Link href={"/something"} className="font-bold text-xl">
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
