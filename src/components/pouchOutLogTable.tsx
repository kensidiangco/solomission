'use client';

import React from 'react'

interface pouchOutLogItem {
    id: number;
    pouch: string[];
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
  return (
    <table className="table-auto uppercase">
        <thead>
            <tr>
                <th className="px-4 py-2 text-stone-600">GETTER</th>
                <th className="px-4 py-2 text-stone-600">SIZE</th>
                <th className="px-4 py-2 text-stone-600">QTY</th>
                <th className="px-4 py-2 text-stone-600">PURPOSE</th>
                <th className="px-4 py-2 text-stone-600">GIVEN BY (OPTIONAL)</th>
                <th className="px-4 py-2 text-stone-600">DATE CREATED</th>
                <th className="px-4 py-2 text-stone-600">STATUS</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.id}>
                    <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">{item.getter}</td>
                    <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">{item.pouch.size}</td>
                    <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">{item.quantity}</td>
                    <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">{item.purpose}</td>
                    <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">{item.given}</td>
                    <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">{item.date_created}</td>
                    <td className={item.status === "free" ? "border border-stone-500 px-4 py-2 text-green-600 font-medium" : "border border-stone-500 px-4 py-2 text-red-600 font-medium" }>{item.status}</td>
                </tr>
            ))} 
        </tbody>
    </table>
  )
}

export default PouchOutLogTable;