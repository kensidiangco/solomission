'use client'

import { usePouchInventory } from '@/hooks/usePouchInventory';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import { ArrowLeft, ArrowRight } from 'lucide-react'; // 👈 for back button icon

export default function Invent() {
  const [quantity, setQuantity] = useState(0);
  const [pouchId, setPouchId] = useState('');
  const { pouch } = usePouchInventory();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}in/`, {
        pouch: pouchId,
        quantity,
      });

      toast.success("✅ Inbound Successfully!");
      mutate(`${process.env.NEXT_PUBLIC_API_URL}pouch/`);

      // reset form
      setQuantity(0);
      setPouchId("");

      router.push('/pouch/');
    } catch (error: any) {
      console.error("Inbound failed:", error.response?.data);
      toast.error(error.response?.data?.detail || "❌ Failed to inbound!");
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
      
      {/* Header with Back */}
      <header className="sticky top-0 z-40 px-4">
        <div className="mx-auto max-w-4xl mt-2 bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl flex items-center justify-between px-4 py-3 border border-white/30">
          {/* Back Button */}
          <button
            onClick={() => router.push('/pouch/')}
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 cursor-pointer transition"
          >
            <ArrowLeft size={20} />
            Home
          </button>

          {/* Title */}
          <h1 className="text-lg font-semibold text-gray-900">📦 Inbound</h1>

          <button
            onClick={() => router.push('/pouch/outbound')}
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 cursor-pointer transition"
          >
            🚚 Outbound
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-6 flex-1">
        {/* Left side text */}
        <div className="text-center md:text-left space-y-3 max-w-lg">
          <p className="font-extrabold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
            Lahat ng pouch na papasok
          </p>
          <p className="font-semibold text-3xl text-gray-800">Dito ila-log</p>
          <p className="font-medium text-xl text-gray-600">Para lamang alam ko</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/20 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-8 space-y-5"
        >
          <p className="text-2xl font-bold text-gray-800">📦 Pouch Inbound</p>

          {/* Size Select */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Size</label>
            <select
              value={pouchId}
              onChange={(e) => setPouchId(e.target.value)}
              name="size"
              className="w-full px-4 py-3 rounded-xl bg-white/40 text-gray-900 placeholder-gray-500 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            >
              <option value="">Select Size</option>
              {pouch.map((size) => (
                <option value={size.id} key={size.id}>
                  {size.size}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              min={100}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              className="w-full px-4 py-3 rounded-xl bg-white/40 text-gray-900 placeholder-gray-500 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-xl text-white font-semibold shadow-lg transition cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            }`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
