'use client'

import { usePouchInventory } from '@/hooks/usePouchInventory';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import BulkUploadModal from '@/components/bulkUploadModal';

// Simple modal component
function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 animate-slide-up">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold">📤 Bulk Upload</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 cursor-pointer">✖</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default function PouchOut() {
  const [getter, setGetter] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [given, setGiven] = useState('');
  const [status, setStatus] = useState('');
  const { pouch } = usePouchInventory();
  const [loading, setLoading] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const router = useRouter();

  const getToday = () => new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const now = getToday();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}out/`, {
        getter,
        quantity,
        purpose,
        status,
        given,
        pouch: size,
        date_created: now,
      });
      toast.success("Outbound Successfully!");
      router.push('/pouch');
    } catch (error: any) {
      console.error("Submission failed:", error.response?.data);
      toast.error("Failed to outbound!");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* iOS-like Header */}
      <header className="sticky top-0 z-40 px-4">
        <div className="mx-auto max-w-4xl mt-2 bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl flex items-center justify-between px-4 py-3 border border-white/30">
          {/* Back Button */}
          <button
            onClick={() => router.push('/pouch/')}
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition cursor-pointer"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {/* Title */}
          <h1 className="text-lg font-semibold text-gray-900">🚚 Outbound</h1>

          {/* Bulk Upload Button */}
          <button
            onClick={() => setBulkModalOpen(true)}
            className="px-4 py-1.5 rounded-xl text-sm font-semibold bg-blue-500 text-white shadow hover:bg-blue-600 transition cursor-pointer"
          >
            Bulk
          </button>
        </div>
      </header>

      <main className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-12">
        {/* Left side text */}
        <div className="text-center md:text-left space-y-3 max-w-lg">
          <h1 className="font-extrabold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
            Lahat ng pouch na lalabas
          </h1>
          <p className="font-semibold text-2xl text-gray-800">Dito ila-log</p>
          <p className="font-medium text-lg text-gray-600">Para lamang alam ko</p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-md bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-xl p-8 space-y-5"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">🚚 Pouch Outbound</h1>
          </div>

          {/* Getter */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Getter</label>
            <input 
              type="text" 
              value={getter}
              onChange={(e) => setGetter(e.target.value)}
              placeholder="Input the name of getter" 
              className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30"
              required
            />
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Size</label>
            <select 
              value={size} 
              onChange={(e) => setSize(e.target.value)} 
              required
              className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30"
            >
              <option value="">Select Size</option>  
              {pouch.map(size => (
                <option value={size.id} key={size.id}>{size.size}</option>  
              ))}  
            </select>    
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Quantity</label>
            <input 
              type="number" 
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="QTY" 
              className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30"
              required
            />
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Purpose</label>
            <select 
              value={purpose} 
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30"
            >
              <option value="">Select Purpose (optional)</option>
              <option value="Sell">Sell</option>
              <option value="Give">Give</option>
            </select>    
          </div>

          {/* Given */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Given</label>
            <input 
              type="text" 
              value={given}
              onChange={(e) => setGiven(e.target.value)}
              placeholder="Type who will be given (optional)" 
              className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              required
              className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30"
            >
              <option value="">Select Status</option>
              <option value="Free">Free</option>
              <option value="Not Paid">Not Paid</option>  
              <option value="Paid">Paid</option>
            </select>
          </div>

          {/* Submit */}
          <input 
            type="submit" 
            value={loading ? "Processing..." : "Submit"} 
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-xl text-white font-semibold shadow-md transition cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          />
        </form>
      </main>

      {/* Modal for Bulk Upload */}
      <Modal isOpen={bulkModalOpen} onClose={() => setBulkModalOpen(false)}>
        <BulkUploadModal />
      </Modal>
    </div>
  );
}
