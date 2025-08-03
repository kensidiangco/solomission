'use client'

import { usePouchInventory } from '@/hooks/usePouchInventory';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function PouchOut() {
  const [getter, setGetter] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [given, setGiven] = useState('');
  const [status, setStatus] = useState('');
  const { pouch, isPouchLoading } = usePouchInventory();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}out/`, {
      getter,
      quantity,
      purpose,
      status,
      given,
      pouch: size,
    });

    router.push('/pouch')
  };

  return (
    <div className='min-h-screen flex gap-50 justify-center items-center'>
      <div className='p-2 text-center flex flex-col gap-4'>
        <p className='font-bold text-5xl'>Lahat ng pouch na lalabas</p>
        <p className='font-bold text-4xl'>Dito ila-log</p>
        <p className='font-bold text-3xl'>Para lamang alam ko</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md w-full bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg bg-clip-padding rounded-2xl border border-white/30 shadow-2xl p-8 space-y-4">

        <p className='text-2xl font-bold'>Stock Out</p>

        <label className="block mb-1 text-gray-700">Getter</label>
        <input 
          type="text" 
          name="getter" 
          value={getter}
          onChange={(e) => setGetter(e.target.value)}
          placeholder="Input the name of getter" 
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none focus:bg-gray-900/25 transition-colors'
          required
        />
        
        <label className="block mb-1 text-gray-700">Size</label>
        <select name="size" value={size} onChange={(e) => setSize(e.target.value)} className='capitalize w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 backdrop-blur bg-clip-padding focus:outline-none focus:bg-gray-900/25 transition-colors' required>
          <option value="">Select Size</option>  
          {pouch.map(size => (
            <option value={size.id} key={size.id}>{size.size}</option>  
          ))}  
        </select>    
        
        <label className="block mb-1 text-gray-700">Quantity</label>
        <input 
          type="number" 
          value={quantity}
          min={100}
          onChange={(e) => setQuantity(Number(e.target.value))}
          name="qty" 
          placeholder="QTY" 
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none focus:bg-gray-900/25 transition-colors'
          required
        />

        <label className="block mb-1 text-gray-700">Purpose</label>
        <select 
          name="status" 
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 backdrop-blur bg-clip-padding focus:outline-none focus:bg-gray-900/25 transition-colors' 
        >
          <option value="">Select Purpose (optional)</option>
          <option value="free">Selling</option>
        </select>    
        
        <label className="block mb-1 text-gray-700">Given</label>
        <input 
          type="text" 
          name="given"
          value={given}
          onChange={(e) => setGiven(e.target.value)}
          placeholder="Type who will be given (optional)" 
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none focus:bg-gray-900/25 transition-colors'
        />

        <label className="block mb-1 text-gray-700">Status</label>
        <select 
          name="status" 
          value={status}
          onChange={(e) => setStatus(e.target.value)} 
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 backdrop-blur bg-clip-padding focus:outline-none focus:bg-gray-900/25 transition-colors' 
          required
        >
          <option value="">Select Status</option>
          <option value="Free">Free</option>
          <option value="Not Paid">Not Paid</option>  
          <option value="Paid">Paid</option>
        </select>

        <input type="submit" value="Submit" className='w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer'/>
      </form>
  
    </div>
  )
}
