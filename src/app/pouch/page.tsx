import Link from "next/link"

export default function Pouch() {
  return (
    <div className="py-50 flex flex-center justify-around items-start mx-50">
        <div className="">
            <div className="">
                <p className="font-bold text-2xl text-stone-800 my-4">Stock</p>

                <div className="flex flex-col gap-10 bg-gradient-to-r from-stone-30 to-slate-100 rounded-t-xl shadow p-4">
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
        </div>
    </div>
  )
}
