'use client';

import { usePouchInventory } from "@/hooks/usePouchInventory";

export default function InboundedDetails() {
      const { pouch } = usePouchInventory(); 
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800">Inbound Details</h1>
            <p className="mt-4 text-gray-600">This is a placeholder for the Inbound Details page.</p>
        </div>
    ); 
}