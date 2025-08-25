'use client';

import React, { useMemo, useState, useEffect } from 'react'
import PouchModal from './pouchModal';

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
        "Free": "bg-green-100 text-green-800",
        "Not Paid": "bg-red-100 text-red-800",
        "Paid": "bg-blue-100 text-blue-800",
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
    <>
        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2 items-center">
                <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"></path></svg>
                    </span>
                    <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Search..."
                    className="pl-10 pr-3 py-2 border rounded-lg text-sm outline-none"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value as any);
                        setCurrentPage(1);
                    }}
                    className="py-2 px-3 border rounded-lg text-sm"
                >
                    <option value="All">All Status</option>
                    <option value="Free">Free</option>
                    <option value="Not Paid">Not Paid</option>
                    <option value="Paid">Paid</option>
                </select>
            </div>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
            <table className="min-w-full table-fixed text-sm text-left capitalize">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-4 py-3">Date Created</th>
                    <th className="px-4 py-3">Getter</th>
                    <th className="px-4 py-3">Pouch Size</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Purpose</th>
                    <th className="px-4 py-3">Given</th>
                    <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                
                <tbody className="divide-y">
                    {paginatedOutlogs.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50" 
                            onClick={() => setCLickedPouch(o.id)} 
                            style={{cursor: 'pointer'}}>
                            <td className="px-4 py-3 align-top">{o.date_created}</td>
                            <td className="px-4 py-3 align-top">{o.getter}</td>
                            <td className="px-4 py-3 align-top">{o.pouch.size}</td>
                            <td className="px-4 py-3 align-top">{o.quantity}</td>
                            <td className="px-4 py-3 align-top">{o.purpose}</td>
                            <td className="px-4 py-3 align-top">{o.given}</td>
                            <td className="px-4 py-3 align-top">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[o.status]}`}>{o.status}</span>
                            </td>
                        </tr>
                    ))}

                    {paginatedOutlogs.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Prev
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
                        className={`px-3 py-1 border rounded ${currentPage === i ? "bg-gray-200 font-bold" : ""}`}
                    >
                        {i}
                    </button>
                    );
                }

                return (
                <>
                    {start > 1 && (
                    <>
                        <button onClick={() => setCurrentPage(1)} className="px-3 py-1 border rounded">1</button>
                        {start > 2 && <span className="px-2">...</span>}
                    </>
                    )}

                    {pages}

                    {end < totalPages && (
                    <>
                        {end < totalPages - 1 && <span className="px-2">...</span>}
                        <button onClick={() => setCurrentPage(totalPages)} className="px-3 py-1 border rounded">{totalPages}</button>
                    </>
                    )}
                </>
                );
            })()}
            <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
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
    </>
    )
}

export default PouchOutLogTable;
