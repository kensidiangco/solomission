'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePouchById } from "@/hooks/usePouchInventory";
import axios from "axios";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function PouchDetailPage() {
  const params = useParams();
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
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ✅ Pre-fill form
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
    e.preventDefault();
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
      mutate(`pouch/${id}`);
    } catch (error: any) {
      console.error("Update failed:", error.response?.data);
      toast.error("❌ Failed to update item!");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handlePouchDelete = async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setDeleteLoading(true);

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}delete/${id}/`);
      toast.success("Item Deleted!");
      mutate("pouch/");
      router.push("/pouch");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete item!");
    } finally {
      setTimeout(() => setDeleteLoading(false), 1000);
    }
  };

  if (isPouchLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (isPouchError) return <p className="text-center text-red-600">Error loading pouch</p>;
  if (!pouch) return <p className="text-center text-gray-600">No pouch found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-lg shadow-md border-b border-white/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => router.push("/pouch")}
            className="text-sm px-4 py-2 rounded-full bg-white/60 hover:bg-white shadow-md transition-all cursor-pointer"
          >
            ⬅ Back
          </button>
          <h1 className="text-lg font-semibold text-gray-800">📦 Update Stock Out</h1>
          <button
            type="button"
            onClick={handlePouchDelete}
            disabled={deleteLoading}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              deleteLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white shadow"
            }`}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex justify-center items-center p-6">
        <form
          onSubmit={handlePouchUpdate}
          className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 p-6 space-y-5"
        >
          {/* Inputs */}
          <div>
            <label className="block text-sm text-gray-600">Getter</label>
            <input
              type="text"
              value={getter}
              onChange={(e) => setGetter(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Purpose</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value={pouch.purpose}>{pouch.purpose}</option>
              <option value="Sell">Sell</option>
              <option value="Give">Give</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Given</label>
            <input
              type="text"
              value={given}
              onChange={(e) => setGiven(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value={pouch.status}>{pouch.status}</option>
              <option value="Free">Free</option>
              <option value="Not Paid">Not Paid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-2xl font-semibold text-white shadow-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
}
