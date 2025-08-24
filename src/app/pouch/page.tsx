'use client';

import PouchOutLogTable from "@/components/pouchOutLogTable";
import PouchStock from "@/components/pouchStock";
import RecentPouchLog from "@/components/recentPouchLog";
import { usePouchInventory, usePouchOutLogInventory, useRecentPouchLogs } from "@/hooks/usePouchInventory";
import Link from "next/link";

export default function Pouch() {
    const { pouchOutLog, isPouchLogLoading, isPouchLogError } = usePouchOutLogInventory(); 
    const { pouch, isPouchLoading, isPouchError } = usePouchInventory(); 
    const { recentPouch, isRecentPouchLoading, isRecentPouchError } = useRecentPouchLogs(); 

    return (
        <div className="h-screen p-20 flex flex-center justify-center items-center relative">

            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-6">
                <header className="flex items-center justify-between mb-6">
                <p className="text-2xl font-bold"><Link href={"/"}>📦</Link> Pouch Inventory System</p>
                <nav className="text-gray-600 hidden md:flex gap-6">
                    <Link href={"/pouch/inbound"} className="cursor-pointer">Inbound</Link>
                    <Link href={"/pouch/outbound"} className="cursor-pointer">Outbound</Link>
                    {/* <Link href={""} className="cursor-pointer">Settings</Link> */}
                </nav>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold">Stock</h2>
                        <PouchStock items={pouch} />
                    </section>
                    
                    <section className="md:col-span-2">
                        <h2 className="text-3xl font-semibold mb-4">Outbound Pouch</h2>
                        <PouchOutLogTable items={pouchOutLog} />
                    </section>
                
                    <aside className="space-y-4">
                        <h2 className="text-3xl font-semibold">Recent Outbound</h2>

                        <RecentPouchLog items={recentPouch} />

                        {/* small legend */}
                        <div className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="inline-block w-3 h-3 rounded-full bg-green-300" /> <span>Free</span>
                                <span className="inline-block w-3 h-3 rounded-full bg-blue-300 ml-3" /> <span>Paid</span>
                                <span className="inline-block w-3 h-3 rounded-full bg-red-300 ml-3" /> <span>Not Paid</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>


  )
}
