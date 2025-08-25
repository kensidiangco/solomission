'use client';

import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import Link from 'next/link';

type Status = "Free" | "Not Paid" | "Paid";

const PouchModal: React.FC<Props> = ({items, isVisible, clickedPouch, handleClose, setLoadingId}) => {
    const statusColors: Record<Status, string> = {
        "Free": "bg-green-200 text-green-800",
        "Not Paid": "bg-yellow-200 text-yellow-800",
        "Paid": "bg-blue-200 text-blue-800",
    };

    const handleMarkAsPaid = async (id: number) => {
        const index = items.findIndex(o => o.id === id);

        if (index !== -1) {
            setLoadingId(id); // show spinner for this button
            try {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}update/${id}/`, {
                    status: "Paid",
                });
            } catch (error: any) {
                console.error("Update failed:", error.response?.data);
                toast.error("❌ Failed to update item!");
            } finally {
                setTimeout(() => {
                    setLoadingId(null); 
                    mutate('outlog/'); // refresh data
                    toast.success("Item marked as Paid!");
                    handleClose(); // close modal
            }, 1000);
            }
        }
    };

    return (
        <div className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 
            transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
            <div className={`mt-4 p-4 border border-stone-600 rounded uppercase 
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                shadow-lg z-50 bg-white/80 transition-all duration-300
                ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                
                <span className='flex flex-col justify-center items-center w-70'>
                    <span className='flex justify-between items-center w-full mb-4'>
                        <h3 className="text-lg font-semibold">Pouch Details</h3>
                        <Link href={`/pouch/${items.find(o => o.id === clickedPouch)?.id}`} className='text-blue-500 hover:underline text-sm'>
                            ✏️ Update
                        </Link> 
                    </span>
                    <span className="flex flex-col gap-1 text-sm items-start w-full">
                        <p><strong>ID:</strong> {items.find(o => o.id === clickedPouch)?.id}</p>
                        <p><strong>Getter:</strong> {items.find(o => o.id === clickedPouch)?.getter}</p>
                        <p><strong>Pouch Size:</strong> {items.find(o => o.id === clickedPouch)?.pouch.size}</p>
                        <p><strong>Quantity:</strong> {items.find(o => o.id === clickedPouch)?.quantity}</p>
                        <p><strong>Purpose:</strong> {items.find(o => o.id === clickedPouch)?.purpose}</p>
                        <p><strong>Given:</strong> {items.find(o => o.id === clickedPouch)?.given}</p>
                        <p><strong>Status:</strong> 
                            <span className={`ml-1 font-bold rounded ${statusColors[items.find(o => o.id === clickedPouch)?.status as Status]}`}>
                                {items.find(o => o.id === clickedPouch)?.status}
                            </span>
                        </p>
                        <p><strong>Date Created:</strong> {items.find(o => o.id === clickedPouch)?.date_created}</p>
                    </span>
                    
                    <span className='flex gap-3'>
                        <button 
                            onClick={handleClose} 
                            className="mt-3 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
                        >
                            Close   
                        </button>
                        {items.find(o => o.id === clickedPouch)?.status === "Not Paid" && (
                            <button
                                onClick={() => handleMarkAsPaid(clickedPouch)}
                                disabled={loadingId === clickedPouch}
                                className={`mt-3 p-2 rounded text-white ${
                                loadingId === clickedPouch
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            >
                                {loadingId === clickedPouch ? "Updating..." : "Mark as Paid"}
                            </button>
                        )}
                    </span>
                </span>
            </div>
        </div>
  )
}

export default PouchModal;