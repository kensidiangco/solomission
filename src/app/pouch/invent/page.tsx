'use client'

import { usePouchInventory } from '@/hooks/usePouchInventory';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {useState} from 'react';

export default function Invent() {
  const [quantity, setQuantity] = useState(0);
  const [pouchId, setPouchId] = useState('');
  const { pouch, isPouchLoading } = usePouchInventory();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}in/`, {
      pouch: pouchId,
      quantity
    });

    router.push('/pouch/')
  };

  return (
    <div className='min-h-screen md:flex md:gap-50 justify-center md:items-center'>
      <div className='p-2 text-center flex flex-col gap-4'>
        <p className='font-bold text-5xl'>Lahat ng pouch na papasok</p>
        <p className='font-bold text-4xl'>Dito ila-log</p>
        <p className='font-bold text-3xl'>Para lamang alam ko</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md w-full bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg bg-clip-padding rounded-2xl border border-white/30 shadow-2xl p-8 space-y-4">
        <p className='text-2xl font-bold'>Stock In</p>
        
        <label className="block mb-2 text-gray-700">Size</label>
        <select 
          value={pouchId}
          onChange={(e) => setPouchId(e.target.value)}
          name="size" 
          className='capitalize w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 backdrop-blur bg-clip-padding focus:outline-none focus:bg-gray-900/25 transition-colors'
          required  
        >

          <option value="">Select Size</option>  
          {pouch.map(size => (
            <option value={size.id} key={size.id}>{size.size}</option>  
          ))}
          
        </select>    
        
        <label className="block mb-2 text-gray-700">Quantity</label>
        
        <input 
          type="number" 
          name="quantity"
          min={100}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="quantity"
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none focus:bg-gray-900/25 transition-colors'
        />

        <input type="submit" value="Submit" className='w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer'/>
      </form>

    </div>
  )
}
