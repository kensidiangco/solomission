'use client'

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
  return (
    <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl shadow-md overflow-hidden">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="px-6 py-4 border-b border-white/10 last:border-b-0 hover:bg-white/20 transition"
          >
            {/* Date */}
            <div className="text-xs text-gray-600 font-medium">{item.date_created}</div>

            {/* Details */}
            <div className="text-sm text-gray-900 font-medium">
              {item.getter}, {item.pouch?.toString()} / {item.quantity} for {item.given}
            </div>

            {/* Status Tag */}
            <span
              className={`inline-block mt-2 px-2 py-0.5 rounded-lg text-xs font-semibold
                ${item.status === "Free" ? "bg-green-200/50 text-green-800" :
                  item.status === "Paid" ? "bg-blue-200/50 text-blue-800" :
                  "bg-red-200/50 text-red-800"
                }`}
            >
              {item.status}
            </span>
          </li>
        ))}

        {items.length === 0 && (
          <li className="px-6 py-4 text-sm text-gray-700 text-center">
            No recent data found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecentPouchLog;
