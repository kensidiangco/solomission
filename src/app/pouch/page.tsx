'use client';

import InboundPouchCard from "@/components/inboundPouchCard";
import PouchOutLogTable from "@/components/pouchOutLogTable";
import PouchStock from "@/components/pouchStock";
import RecentPouchLog from "@/components/recentPouchLog";
import { usePouchInventory, usePouchOutboundInventory, useRecentPouchLogs, usePouchInboundInventory } from "@/hooks/usePouchInventory";
import Link from "next/link";

export default function Pouch() {
  const { pouchOutbound } = usePouchOutboundInventory(); 
  const { pouch } = usePouchInventory(); 
  const { recentPouch } = useRecentPouchLogs(); 
  const { pouchInbound } = usePouchInboundInventory();

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
          <section className="bg-white rounded-2xl shadow p-6 md:col-span-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">📦 Stock</h2>
            <PouchStock items={pouch} />
          </section>

          {/* Inbound Pouch */}
          <section
            className="relative md:col-span-2 rounded-3xl p-6
              bg-gradient-to-br from-white/70 via-white/50 to-white/30
              backdrop-blur-2xl border border-white/30
              shadow-[0_4px_20px_rgba(0,0,0,0.08)]
              hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]
              transition-all duration-300"
          >
            {/* Glow Accent */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
              🚚 Recent Inbounded Pouch
            </h2>

            {/* Inbound Pouch Card (styled like your list cards) */}
            <InboundPouchCard items={pouchInbound}/>
          </section>


          {/* Recent Section */}
          <section className="bg-white rounded-2xl shadow p-6 md:col-span-1 space-y-6 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold">🕒 Recent Outbound</h2>
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

          
          {/* Outbound Logs Section (takes 2 cols) */}
          <section className="bg-white rounded-2xl shadow p-6 md:col-span-4 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">🚚 Outbound Pouch</h2>
            <PouchOutLogTable items={pouchOutbound} />
          </section>

        </div>
      </div>
    </div>
  );
}
