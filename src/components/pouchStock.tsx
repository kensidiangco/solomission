import React from 'react'

interface pouchStockItem {
    id: number
    size: number;
    quantity: string;
    date_created: string;
    date_updated: string;
}

interface Props {
    items: pouchStockItem[];
}

const PouchStock: React.FC<Props> = ({items}) => {
  return (
    <>
        <div className="bg-white border rounded-lg shadow-sm">

            <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Size</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                </tr>
                </thead>
                <tbody className="divide-y">
                    {items.map(item => (

                        <tr className="odd:bg-white even:bg-gray-50" key={item.id}>
                            <td className="px-6 py-4 text-sm">{item.size}</td>
                            <td className="px-6 py-4 text-sm">{item.quantity_formatted}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600">Total stock: 1,000</p>
            <p className="text-sm text-gray-600">Last updated: 2025-08-09</p>
        </div>
    </>
  )
}

export default PouchStock;