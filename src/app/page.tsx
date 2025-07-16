import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-100 flex-center justify-center">
      <p className="font-bold text-center text-7xl mb-5">Solo Mission Project</p>
      <div className="flex flex-col flex-wrap gap-2">
        <Link href={"/pouch"} className="font-bold text-center text-3xl">
          <p className="text-blue-400">Pouch Inventory Sytem</p>
        </Link>
        <Link href={"/something"} className="font-bold text-center text-3xl">
          <p className="text-blue-400">AWB Inventory Sytem</p>
        </Link>
        <Link href={"/something"} className="font-bold text-center text-3xl">
          <p className="text-blue-400">Payroll System</p>
        </Link>

        <Link href={"/something"} className="font-bold text-center text-3xl">
          <p className="text-blue-400">Something</p>
        </Link>
      </div>
      
    </div>
  );
}
