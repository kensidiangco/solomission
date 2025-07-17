import Link from "next/link"

export default function Pouch() {
  return (
    <div className="p-20 flex flex-center justify-center">
        <div className="flex flex-col gap-5">
            <p className="font-bold text-center text-7xl mb-2 text-stone-800">Pouch</p>

            <div className="flex flex-col gap-4 p-2">
                <div className="flex gap-4 pl-2 pr-2 justify-around">
                    <div className="p-4 text-2xl font-bold bg-gradient-to-r from-stone-50 to-slate-100 rounded-t-xl hover:shadow-2xl text-stone-600">
                        <p className="">Small</p>
                        <p className="">1k</p>
                    </div>
                    <div className="p-4 text-2xl font-bold bg-gradient-to-r from-stone-50 to-slate-100 rounded-t-xl hover:shadow-2xl text-stone-600">
                        <p className="">Medium</p>
                        <p className="">1k</p>
                    </div>
                    <div className="p-4 text-2xl font-bold bg-gradient-to-r from-stone-50 to-slate-100 rounded-t-xl hover:shadow-2xl text-stone-600">
                        <p className="">Large</p>
                        <p className="">1k</p>
                    </div>
                </div>
            </div>

            <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-stone-50 to-slate-100 p-5">
                <table className="table-auto">
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
                        <tr>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">MARJ</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">LARGE</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">1K</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">FOR SELL</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">---</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">07-16-25</td>
                            <td className="border border-stone-500 px-4 py-2 text-red-600 font-medium">NOT PAID</td>
                        </tr>
                        <tr>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">LEO</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">LARGE</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">3.5K</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">FOR SELL</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">---</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">07-17-25</td>
                            <td className="border border-stone-500 px-4 py-2 text-green-600 font-medium">PAID</td>
                        </tr>
                        <tr>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">JAMES</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">LARGE</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">1K</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">FOR SELL</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">---</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">07-17-25</td>
                            <td className="border border-stone-500 px-4 py-2 text-green-600 font-medium">PAID</td>
                        </tr>
                        <tr>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">JAMES</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">MEDIUM</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">5K</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">FOR SELL</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">ELSA ONG</td>
                            <td className="border border-stone-500 px-4 py-2 text-stone-600 font-medium">07-17-25</td>
                            <td className="border border-stone-500 px-4 py-2 text-green-600 font-medium">FREE</td>
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
