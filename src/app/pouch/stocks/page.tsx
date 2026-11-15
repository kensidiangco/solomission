'use client';

import PagesHeader from "@/components/pagesHeader";
import { usePouchInventory } from "@/hooks/usePouchInventory";
import Link from "next/dist/client/link";

export default function InboundedDetails() {
      const { pouch } = usePouchInventory(); 
    
    return (
       <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                <PagesHeader />
                <section className="bg-white rounded-2xl shadow p-6 md:col-span-1 space-y-6 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300">

                    <div className="p-4 border rounded-xl bg-gray-50 text-sm text-gray-700">
                        <h2 className="font-medium text-lg mb-2">Remaining Pouch Stocks</h2>
                        <div className="flex flex-wrap gap-4">
                            {pouch.map(item => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <span className="font-semibold">{item.size}</span>
                                    <span className="font-semibold">{item.quantity_formatted}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    ); 
}