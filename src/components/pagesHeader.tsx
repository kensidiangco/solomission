'use client';

import Link from "next/dist/client/link";

export default function PagesHeader() {

  return (
    <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Link href={"/pouch"} className="">📦
            Pouch Inventory System</Link>
        </h1>
        <nav className="hidden md:flex gap-6 text-gray-600 text-sm font-medium">
        <Link href={"/pouch/inbound"} className="hover:text-blue-500 transition">Inbound</Link>
        <Link href={"/pouch/outbound"} className="hover:text-blue-500 transition">Outbound</Link>
        </nav>
    </header>
  )
}