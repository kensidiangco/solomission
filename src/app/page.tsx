"use client";

import Link from "next/link";

export default function Home() {
  const apps = [
    { name: "Pouch Inventory System", href: "/pouch", color: "from-blue-500 to-indigo-500" },
    { name: "AWB Inventory System", href: "/something", color: "from-pink-500 to-red-500" },
    { name: "Payroll System", href: "/something", color: "from-green-500 to-emerald-500" },
    { name: "Something", href: "/something", color: "from-purple-500 to-violet-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-10">
      {/* Title */}
      <h1 className="font-extrabold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-12 text-center drop-shadow-sm">
        Solo Mission Project
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-4xl">
        {apps.map((app, i) => (
          <Link
            href={app.href}
            key={i}
            className="rounded-3xl shadow-xl backdrop-blur-lg bg-white/30 border border-white/40 p-10 flex flex-col items-center justify-center transition hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <p
              className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${app.color}`}
            >
              {app.name}
            </p>
            <span className="mt-2 text-sm text-gray-700 text-center">
              {app.name === "Pouch Inventory System" &&
                "Track and manage pouch stock in real-time."}
              {app.name === "AWB Inventory System" &&
                "Organize airway bills and logistics data."}
              {app.name === "Payroll System" &&
                "Automated employee salary and records management."}
              {app.name === "Something" &&
                "Placeholder for future system integration."}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
