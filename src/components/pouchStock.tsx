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
    <div className="">
    <p className="font-bold text-2xl text-stone-800 my-4">Stock</p>

    <div className="flex flex-col gap-5 bg-gradient-to-r from-stone-100 to-slate-50 rounded-t-xl shadow p-4">
        {items.map(item => (
            <div className="flex flex-col gap-2" key={item.id}>
                <p className="font-bold text-xl">{item.size}</p>
                <p className="">{item.quantity_formatted}</p>
            </div>
        ))}
    </div>
</div>
  )
}

export default PouchStock;