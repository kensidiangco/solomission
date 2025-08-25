'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePouchById } from "@/hooks/usePouchInventory";
import axios from "axios";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function PouchDetailPage() {
  const params = useParams(); // { id: "3" }
  const id = Number(params.id);
  const { pouch, isPouchLoading, isPouchError } = usePouchById(id);
  const [getter, setGetter] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [given, setGiven] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ Initialize form fields when pouch loads
  useEffect(() => {
    if (pouch) {
      setGetter(pouch.getter || "");
      setSize(pouch.pouch.size || "");
      setQuantity(pouch.quantity || 0);
      setPurpose(pouch.purpose || "");
      setGiven(pouch.given || "");
      setStatus(pouch.status || "");
    }
  }, [pouch]);

  const handlePouchUpdate = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent form reload

    setLoading(true);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}update/${id}/`, {
        id,
        getter,
        pouch: pouch?.size,
        quantity,
        purpose,
        given,
        status,
      });

      toast.success("✅ Item Updated!");
      // ✅ Refresh the SWR cache
      mutate(`pouch/${id}`);
      router.push('/pouch/');
    } catch (error: any) {
      console.error("Update failed:", error.response?.data);
      toast.error("❌ Failed to update item!");
    } finally {
      setTimeout(() => setLoading(false), 1000); // small delay for spinner
    }
  };

  if (isPouchLoading) return <p>Loading...</p>;
  if (isPouchError) return <p>Error loading pouch</p>;
  if (!pouch) return <p>No pouch found</p>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-10 justify-center items-start md:items-center p-6">
      <form
        onSubmit={handlePouchUpdate}
        className="max-w-md w-full bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow p-8 space-y-4"
      >
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Stock Out</p>
        </div>

        <label className="block mb-1 text-gray-700">Getter</label>
        <input
          type="text"
          value={getter}
          onChange={(e) => setGetter(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none"
          required
        />

        <label className="block mb-1 text-gray-700">Size</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 focus:outline-none"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <label className="block mb-1 text-gray-700">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 focus:outline-none"
          required
        />

        <label className="block mb-1 text-gray-700">Purpose</label>
        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900"
        >
          <option value={`${pouch.purpose}`}>{pouch.purpose}</option>
          <option value="Sell">Sell</option>
          <option value="Give">Give</option>
        </select>

        <label className="block mb-1 text-gray-700">Given</label>
        <input
          type="text"
          value={given}
          onChange={(e) => setGiven(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 focus:outline-none"
        />

        <label className="block mb-1 text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 focus:outline-none"
        >
          <option value={`${pouch.status}`}>{pouch.status}</option>
          <option value="Free">Free</option>
          <option value="Not Paid">Not Paid</option>
          <option value="Paid">Paid</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`mt-3 w-full p-2 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
