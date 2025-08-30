'use client'

import React, { useState, useMemo } from 'react'

interface recentPouchInbound {
  id: number;
  date_created: string;
  pouch: { size: string };
  quantity_formatted?: string;
}

type Props = {
  items: recentPouchInbound[];
};

const InboundPouchCard: React.FC<Props> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // slice items for current page
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [currentPage, items]);

  return (
    <div className="space-y-3">
      {/* Render Items */}
      {paginatedItems.map(item => (
        <div 
          key={item.id} 
          className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          {/* Top Section */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold">Date Inbound</p>
              <p className="text-xs text-gray-500">{item.date_created}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
              {item.pouch?.size}
            </span>
          </div>

          {/* Details */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>
              Pouch: <b>{item.quantity_formatted ?? item.quantity}</b>
            </span>
            <span>
              Status: <b>Inbounded</b>
            </span>
          </div>
        </div>
      ))}

      {/* If no data */}
      {items.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          No inbound records found.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition 
              ${currentPage === 1 
                ? "opacity-40 cursor-not-allowed" 
                : "hover:bg-gray-100 active:scale-95 cursor-pointer"}`}
          >
            ◀ Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition
                ${currentPage === page
                  ? "bg-black text-white shadow-md"
                  : "hover:bg-gray-100 active:scale-95 cursor-pointer"}`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition 
              ${currentPage === totalPages 
                ? "opacity-40 cursor-not-allowed" 
                : "hover:bg-gray-100 active:scale-95 cursor-pointer"}`}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  )
}

export default InboundPouchCard
