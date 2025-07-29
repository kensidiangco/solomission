'use client';

import PouchLogTable from "@/components/pouchLogTable"
import { usePouchLogInventory } from "@/hooks/usePouchLogInventory";

export default function Pouch() {
    const { items, isLoading, isError } = usePouchLogInventory(); 

    return (
        <div className="py-50 flex flex-center justify-around items-start mx-50">
            <div className="">
                <div className="">
                    <p className="font-bold text-2xl text-stone-800 my-4">Stock</p>

                    <div className="flex flex-col gap-10 bg-gradient-to-r from-stone-100 to-slate-50 rounded-t-xl shadow p-4">
                        <div className="">
                            <p className="font-bold text-xl">Small</p>
                            <p className="">1,000</p>
                        </div>
                        <div className="">
                            <p className="font-bold text-xl">Medium</p>
                            <p className="">1,000</p>
                        </div>
                        <div className="">
                            <p className="font-bold text-xl">Large</p>
                            <p className="">3,500</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="font-bold text-2xl text-stone-800 my-4">Log</p>
                <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-stone-50 to-slate-100 p-5 shadow">
                    <PouchLogTable items={items}/>
                </div>
            </div>
        </div>
  )
}
