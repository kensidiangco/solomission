'use client';

import React, { useMemo, useState, useEffect } from 'react'
import PouchModal from './pouchModal';
import { X } from "lucide-react";

type PouchSize = "Small" | "Medium" | "Large";
type Status = "Free" | "Not Paid" | "Paid";
interface pouchOutLogItem {
    id: number;
    pouch: { size: string };
    getter: string;
    quantity: number;
    purpose: string;
    status: string;
    given: string;
    date_created: string;
}
type Props = {
  items: pouchOutLogItem[];
};

const PouchOutLogTable: React.FC<Props> = ({items}) => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [clickedPouch, setCLickedPouch] = useState<number | null>(null);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    // NEW: for smooth animation
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (clickedPouch) {
            setIsVisible(true); // open animation
        }
    }, [clickedPouch]);

    const handleClose = () => {
        setIsVisible(false); // play closing animation
        setTimeout(() => setCLickedPouch(null), 300); // wait for transition to finish
    };

    const statusColors: Record<Status, string> = {
        "Free": "bg-green-100 text-green-700",
        "Not Paid": "bg-red-100 text-red-700",
        "Paid": "bg-blue-100 text-blue-700",
    };

    const filteredOutlogs = useMemo(() => {
        return items.filter((o) => {
        const matchesSearch =
            search.trim() === "" ||
            o.getter.toLowerCase().includes(search.toLowerCase()) ||
            o.pouch.toString().toLowerCase().includes(search.toLowerCase()) ||
            o.purpose.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || o.status === statusFilter;
        return matchesSearch && matchesStatus;
        });
    }, [items, search, statusFilter]);

    const totalPages = Math.ceil(filteredOutlogs.length / itemsPerPage);
    const paginatedOutlogs = filteredOutlogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
    <div className="space-y-4">
        {/* Filters */}
        <div className="flex items-center justify-between gap-3">
            <input
                value={search}
                onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
                }}
                placeholder="Search..."
                className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none pr-8"
            />

            {/* Clear button (only shows if there's text) */}
            {search && (
                <button
                onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                }}
                className=" text-stone-600 hover:text-stone-800 cursor-pointer"
                >
                <X size={16} />
                </button>
            )}

            <select
                value={statusFilter}
                onChange={(e) => {
                    setStatusFilter(e.target.value as any);
                    setCurrentPage(1);
                }}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm shadow-sm bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
                <option value="All">All Status</option>
                <option value="Free">Free</option>
                <option value="Not Paid">Not Paid</option>
                <option value="Paid">Paid</option>
            </select>
        </div>

        {/* List (iOS style cards instead of rigid table) */}
        <div className="space-y-3">
            {paginatedOutlogs.map((o) => (
                <div
                    key={o.id}
                    onClick={() => setCLickedPouch(o.id)}
                    className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-semibold">{o.getter}</p>
                            <p className="text-xs text-gray-500">{o.date_created}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[o.status]}`}>
                            {o.status}
                        </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
                        <span>Pouch: <b>{o.pouch.size}</b></span>
                        <span>Qty: <b>{o.quantity}</b></span>
                        <span>Purpose: {o.purpose}</span>
                        <span>Given: {o.given}</span>
                    </div>
                </div>
            ))}

            {paginatedOutlogs.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                    No records found.
                </div>
            )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition 
                ${currentPage === 1 
                    ? "opacity-40 cursor-not-allowed" 
                    : "hover:bg-gray-100 active:scale-95 cursor-pointer"}`}
            >
                ◀ Prev
            </button>

            {(() => {
                const maxVisible = 4;
                let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                let end = start + maxVisible - 1;

                if (end > totalPages) {
                end = totalPages;
                start = Math.max(1, end - maxVisible + 1);
                }

                const pages = [];
                for (let i = start; i <= end; i++) {
                pages.push(
                    <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition
                        ${currentPage === i 
                        ? "bg-black text-white shadow-md" 
                        : "hover:bg-gray-100 active:scale-95 cursor-pointer"}`}
                    >
                    {i}
                    </button>
                );
                }

                return (
                <>
                    {start > 1 && (
                    <>
                        <button
                        onClick={() => setCurrentPage(1)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-sm hover:bg-gray-100"
                        >
                        1
                        </button>
                        {start > 2 && <span className="px-2 text-gray-400">…</span>}
                    </>
                    )}

                    {pages}

                    {end < totalPages && (
                    <>
                        {end < totalPages - 1 && <span className="px-2 text-gray-400">…</span>}
                        <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-sm hover:bg-gray-100"
                        >
                        {totalPages}
                        </button>
                    </>
                    )}
                </>
                );
            })()}

            <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition 
                ${currentPage === totalPages || totalPages === 0 
                    ? "opacity-40 cursor-not-allowed" 
                    : "hover:bg-gray-100 active:scale-95 cursor-pointer"}`}
            >
                Next ▶
            </button>
        </div>


        {clickedPouch && (
            <PouchModal 
                items={items}
                clickedPouch={clickedPouch}
                setCLickedPouch={setCLickedPouch}
                isVisible={isVisible}
                handleClose={handleClose}
                loadingId={loadingId}
                setLoadingId={setLoadingId}
            />
        )}
    </div>
    )
}

export default PouchOutLogTable;
