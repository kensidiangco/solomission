'use client';

import PouchOutLogTable from "@/components/pouchOutLogTable";
import PouchStock from "@/components/pouchStock";
import { usePouchInventory, usePouchOutLogInventory } from "@/hooks/usePouchInventory";

export default function Pouch() {
    const { pouchOutLog, isPouchLogLoading, isPouchLogError } = usePouchOutLogInventory(); 
    const { pouch, isPouchLoading, isPouchError } = usePouchInventory(); 

    return (
        <div className="py-50 flex flex-center justify-around items-start mx-50">
            <PouchStock items={pouch} />
            <div className="">
                <p className="font-bold text-2xl text-stone-800 my-4">Log</p>
                <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-stone-50 to-slate-100 p-5 shadow">
                    <PouchOutLogTable items={pouchOutLog} />
                </div>
            </div>
        </div>
  )
}
