'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePouchInboundById } from "@/hooks/usePouchInventory";
import axios from "axios";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { ArrowLeft } from "lucide-react";

export default function InboundedDetails() {
  const params = useParams();
  const id = Number(params.id);
  const { inboundedPouch, isInboundedPouchLoading, isInboundedPouchError } =
    usePouchInboundById(id);
  const router = useRouter();

  const [quantity, setQuantity] = useState(0);
  const [dateCreated, setDateCreated] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ✅ Pre-fill form with fetched pouch
  useEffect(() => {
    if (inboundedPouch) {
      setQuantity(inboundedPouch.quantity || 0);
      setDateCreated(inboundedPouch.date_created || "");
    }
  }, [inboundedPouch]);

  // ✅ Update inbound pouch
  const handleInboundUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}inbound/update/${id}/`, {
        id,
        quantity,
        date_created: dateCreated,
      });

      toast.success("✅ Inbound updated!");
      mutate(`inbound/${id}`);
    } catch (error: any) {
      console.error("Update failed:", error.response?.data);
      toast.error("❌ Failed to update inbound!");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // ✅ Delete inbound pouch
  const handleInboundDelete = async () => {
    if (!confirm("Are you sure you want to delete this inbound?")) return;
    setDeleteLoading(true);

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}inbound/delete/${id}/`);
      toast.success("Inbound deleted!");
      mutate("inbound/");
      router.push("/pouch");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete inbound!");
    } finally {
      setTimeout(() => setDeleteLoading(false), 1000);
    }
  };

  if (isInboundedPouchLoading)
    return <p className="text-center text-gray-600">Loading...</p>;
  if (isInboundedPouchError)
    return <p className="text-center text-red-600">Error loading inbound</p>;
  if (!inboundedPouch)
    return <p className="text-center text-gray-600">No inbound found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-yellow-100">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4">
        <div className="mx-auto max-w-4xl mt-2 bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl flex items-center justify-between px-4 py-3 border border-white/30">
          {/* Back Button */}
          <button
            onClick={() => router.push("/pouch/")}
            className="flex items-center gap-2 text-green-600 font-medium hover:text-green-800 cursor-pointer transition"
          >
            <ArrowLeft size={20} />
            Home
          </button>

          <h1 className="text-lg font-semibold text-gray-800">📦 Inbound Details</h1>

          <button
            type="button"
            onClick={handleInboundDelete}
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

      {/* Form */}
      <main className="flex justify-center items-center p-6 mt-10">
        <form
          onSubmit={handleInboundUpdate}
          className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 p-6 space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-600">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Date Created</label>
            <input
              type="date"
              value={dateCreated}
              onChange={(e) => setDateCreated(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-2xl font-semibold text-white shadow-md transition-all cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Updating..." : "Update Inbound"}
          </button>
        </form>
      </main>
    </div>
  );
}
