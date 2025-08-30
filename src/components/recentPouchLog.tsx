'use client'

import { useState } from "react";

interface recentPouchLogs {
  id: number;
  getter: string;
  quantity: string;
  purpose: string;
  status: string;
  given: string;
  date_created: string;
  pouch: string[];
}

type Props = {
  items: recentPouchLogs[];
};

const RecentPouchLog: React.FC<Props> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // slice items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl shadow-md overflow-hidden">
      <ul>
        {paginatedItems.map((item) => (
          <li
            key={item.id}
            className="px-6 py-4 border-b border-white/10 last:border-b-0 hover:bg-white/20 transition"
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.getter}</p>
                <p className="text-xs text-gray-500">{item.date_created}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium
                  ${item.status === "Free" ? "bg-green-200/50 text-green-800" :
                    item.status === "Paid" ? "bg-blue-200/50 text-blue-800" :
                    "bg-red-200/50 text-red-800"
                  }`}
              >
                {item.status}
              </span>
            </div>

            {/* Details row */}
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
              <span>Pouch: <b>{item.pouch?.size}</b></span>
              <span>Qty: <b>{item.quantity}</b></span>
              <span>Given: <b>{item.given}</b></span>
              {item.purpose && <span>Purpose: {item.purpose}</span>}
            </div>
          </li>
        ))}

        {items.length === 0 && (
          <li className="px-6 py-4 text-sm text-gray-700 text-center">
            No recent data found.
          </li>
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 p-4">
          {/* Prev button */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition 
              ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
          >
            ◀ Prev
          </button>

          {/* Current page number */}
          <span className="px-3 py-1 rounded-md text-sm font-semibold bg-gray-200/60">
            {currentPage}
          </span>

          {/* Next button */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition 
              ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentPouchLog;
