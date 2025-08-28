'use client';

import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import Link from 'next/link';

type Status = "Free" | "Not Paid" | "Paid";

const PouchModal: React.FC<Props> = ({ items, isVisible, clickedPouch, handleClose, loadingId, setLoadingId }) => {
    const statusColors: Record<Status, string> = {
        "Free": "bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs",
        "Not Paid": "bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs",
        "Paid": "bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs",
    };

    const handleMarkAsPaid = async (id: number) => {
        const index = items.findIndex(o => o.id === id);

        if (index !== -1) {
            setLoadingId(id);
            try {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}pouch/paid/${id}/`, {
                status: "Paid",
                });

                // ✅ Only run when successful
                toast.success("✅ Item marked as Paid!");
                mutate("outlog/");
                handleClose();

            } catch (error: any) {
                console.error("Update failed:", error.response?.data);
                toast.error("❌ Failed to update item!");
            } finally {
                // ✅ Always reset loading state
                setTimeout(() => {
                setLoadingId(null);
                }, 1000);
            }
        }

    };

    return (
        <div
            className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 
            transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div
            className={`p-6 rounded-2xl shadow-xl bg-white/90 border border-gray-200
                transition-all duration-300 transform
                ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">📦 Pouch Details</h3>
                <Link
                href={`/pouch/${items.find(o => o.id === clickedPouch)?.id}`}
                className="text-blue-500 hover:underline text-sm"
                >
                ✏️ Update
                </Link>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-700">
                <p><strong>ID:</strong> {items.find(o => o.id === clickedPouch)?.id}</p>
                <p><strong>Getter:</strong> {items.find(o => o.id === clickedPouch)?.getter}</p>
                <p><strong>Pouch Size:</strong> {items.find(o => o.id === clickedPouch)?.pouch.size}</p>
                <p><strong>Quantity:</strong> {items.find(o => o.id === clickedPouch)?.quantity}</p>
                <p><strong>Purpose:</strong> {items.find(o => o.id === clickedPouch)?.purpose}</p>
                <p><strong>Given:</strong> {items.find(o => o.id === clickedPouch)?.given}</p>
                <p>
                <strong>Status:</strong>{" "}
                <span className={statusColors[items.find(o => o.id === clickedPouch)?.status as Status]}>
                    {items.find(o => o.id === clickedPouch)?.status}
                </span>
                </p>
                <p><strong>Date Created:</strong> {items.find(o => o.id === clickedPouch)?.date_created}</p>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
                <button
                onClick={handleClose}
                className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition active:scale-95"
                >
                Close
                </button>
                {items.find(o => o.id === clickedPouch)?.status === "Not Paid" && (
                <button
                    onClick={() => handleMarkAsPaid(clickedPouch)}
                    disabled={loadingId === clickedPouch}
                    className={`px-4 py-2 rounded-full text-white transition active:scale-95 cursor-pointer ${
                    loadingId === clickedPouch
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loadingId === clickedPouch ? "Updating..." : "Mark as Paid"}
                </button>
                )}
            </div>
            </div>
        </div>
    );
};

export default PouchModal;
