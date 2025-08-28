import React from 'react'

interface pouchStockItem {
    id: number
    size: number;
    quantity: string;
    date_created: string;
    date_updated: string;
    quantity_formatted: string;
}

interface Props {
    items: pouchStockItem[];
}

const PouchStock: React.FC<Props> = ({ items }) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    return (
        <>
            {/* Glassmorphism Table */}
            <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-white/20">
                    <thead className="bg-white/10">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Size</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {items.map(item => (
                            <tr
                                key={item.id}
                                className="hover:bg-white/20 transition"
                            >
                                <td className="px-6 py-4 text-sm text-gray-900">{item.size}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {item.quantity_formatted}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Glass footer */}
            <div className="mt-3 p-3 rounded-xl backdrop-blur-lg bg-white/30 border border-white/20 shadow-md">
                <p className="text-sm text-gray-700">📅 Last updated: {today}</p>
            </div>
        </>
    )
}

export default PouchStock;

