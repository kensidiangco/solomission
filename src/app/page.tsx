import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-100">
      <p className="font-bold text-center text-7xl mb-5">YOU ARE HERE!</p>
      <Link href={"/something"} className="font-bold text-center text-4xl">
        <p className="text-blue-400">Proceed to something.</p>
      </Link>
      
    </div>
  );
}
