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


const RecentPouchLog: React.FC<Props> = ({items}) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <ul>
            {items.map((item) => (
                <li className="px-4 py-4 border-b last:border-b-0" key={item.id}>
                    <div className="text-sm text-gray-700 font-medium">{item.date_created}</div>
                    <div className="text-sm text-gray-800">{item.getter}, {item.pouch.size} / {item.quantity_formatted} for {item.given}</div>
                </li>
            ))}
            {items.length === 0 && (
                <li className="px-4 py-4 border-b last:border-b-0">
                    <div className="text-sm text-gray-700 font-medium">No recent data found.</div>
                </li>
            )}
        </ul>
    </div>
  )
}

export default RecentPouchLog;
