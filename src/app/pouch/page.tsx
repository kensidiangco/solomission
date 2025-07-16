import Link from "next/link"

export default function Pouch() {
  return (
    <div className="p-100 flex flex-center justify-center">
        <div className="flex flex-col gap-10">
            <p className="font-bold text-center text-7xl mb-5">Pouch Inventory</p>
            <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100 p-10">

                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-emerald-600">GETTER</th>
                            <th className="px-4 py-2 text-emerald-600">SIZE</th>
                            <th className="px-4 py-2 text-emerald-600">QTY</th>
                            <th className="px-4 py-2 text-emerald-600">PURPOSE</th>
                            <th className="px-4 py-2 text-emerald-600">GIVEN BY (OPTIONAL)</th>
                            <th className="px-4 py-2 text-emerald-600">DATE CREATED</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">KEN</td>
                            <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">MEDIUM</td>
                            <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">1K</td>
                            <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">FOR SELL</td>
                            <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">GOKONWEI</td>
                            <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">Sample</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <Link href={"/"} className="font-bold text-center text-4xl">
                <p className="text-blue-400">Back!</p>
            </Link>
        </div>
      
    </div>
  )
}
