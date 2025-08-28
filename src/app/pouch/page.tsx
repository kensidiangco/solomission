'use client';

import PouchOutLogTable from "@/components/pouchOutLogTable";
import PouchStock from "@/components/pouchStock";
import RecentPouchLog from "@/components/recentPouchLog";
import { usePouchInventory, usePouchOutLogInventory, useRecentPouchLogs } from "@/hooks/usePouchInventory";
import Link from "next/link";

export default function Pouch() {
  const { pouchOutLog } = usePouchOutLogInventory(); 
  const { pouch } = usePouchInventory(); 
  const { recentPouch } = useRecentPouchLogs(); 

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Link href={"/"} className="hover:scale-110 transition">📦</Link>
            Pouch Inventory System
          </h1>
          <nav className="hidden md:flex gap-6 text-gray-600 text-sm font-medium">
            <Link href={"/pouch/inbound"} className="hover:text-blue-500 transition">Inbound</Link>
            <Link href={"/pouch/outbound"} className="hover:text-blue-500 transition">Outbound</Link>
          </nav>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Stock Section */}
          <section className="bg-white rounded-2xl shadow p-6 md:col-span-1">
            <h2 className="text-lg md:text-xl font-semibold mb-4">📦 Stock</h2>
            <PouchStock items={pouch} />
          </section>

          {/* Outbound Logs Section (takes 2 cols) */}
          <section className="bg-white rounded-2xl shadow p-6 md:col-span-2">
            <h2 className="text-lg md:text-xl font-semibold mb-4">🚚 Outbound Pouch</h2>
            <PouchOutLogTable items={pouchOutLog} />
          </section>

          {/* Recent Section */}
          <section className="bg-white rounded-2xl shadow p-6 md:col-span-1 space-y-6">
            <h2 className="text-lg md:text-xl font-semibold">🕒 Recent Outbound</h2>
            <RecentPouchLog items={recentPouch} />

            {/* Legend */}
            <div className="p-4 border rounded-xl bg-gray-50 text-sm text-gray-700">
              <h3 className="font-medium mb-2">Legend</h3>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-green-300" /> Free
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-300" /> Paid
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-300" /> Not Paid
                </span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
