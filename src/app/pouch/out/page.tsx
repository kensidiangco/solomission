'use client'

import { usePouchInventory } from '@/hooks/usePouchInventory';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import * as XLSX from 'xlsx';

export default function PouchOut() {
  const [getter, setGetter] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [given, setGiven] = useState('');
  const [status, setStatus] = useState('');
  const [excelData, setExcelData] = useState<any[]>([]);
  const { pouch } = usePouchInventory();
  const router = useRouter();

  // Single form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}out/`, {
      getter,
      quantity,
      purpose,
      status,
      given,
      pouch: size,
    });
    router.push('/pouch');
  };

  // Excel upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      console.log("Parsed Excel:", json);
      setExcelData(json);
    };
    reader.readAsBinaryString(file);
  };

  // Send Excel data to API
  const handleBulkUpload = async () => {
    if (excelData.length === 0) {
      alert("No data to upload");
      return;
    }
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}bulk/`, excelData);
      alert("Bulk data uploaded!");
      router.push('/pouch');
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row gap-10 justify-center items-start md:items-center p-6'>
      {/* --- Single Entry Form --- */}
      <form 
        onSubmit={handleSubmit} 
        className="max-w-md w-full bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl p-8 space-y-4"
      >
        <p className='text-2xl font-bold'>Stock Out</p>

        <label className="block mb-1 text-gray-700">Getter</label>
        <input 
          type="text" 
          value={getter}
          onChange={(e) => setGetter(e.target.value)}
          placeholder="Input the name of getter" 
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none'
          required
        />

        <label className="block mb-1 text-gray-700">Size</label>
        <select value={size} onChange={(e) => setSize(e.target.value)} required
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 focus:outline-none'>
          <option value="">Select Size</option>  
          {pouch.map(size => (
            <option value={size.id} key={size.id}>{size.size}</option>  
          ))}  
        </select>    

        <label className="block mb-1 text-gray-700">Quantity</label>
        <input 
          type="number" 
          min={100}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="QTY" 
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 focus:outline-none'
          required
        />

        <label className="block mb-1 text-gray-700">Purpose</label>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)}
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900'>
          <option value="">Select Purpose (optional)</option>
          <option value="Sell">Sell</option>
          <option value="Give">Give</option>
        </select>    

        <label className="block mb-1 text-gray-700">Given</label>
        <input 
          type="text" 
          value={given}
          onChange={(e) => setGiven(e.target.value)}
          placeholder="Type who will be given (optional)" 
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 focus:outline-none'
        />

        <label className="block mb-1 text-gray-700">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required
          className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 focus:outline-none'>
          <option value="">Select Status</option>
          <option value="Free">Free</option>
          <option value="Not Paid">Not Paid</option>  
          <option value="Paid">Paid</option>
        </select>

        <input 
          type="submit" 
          value="Submit" 
          className='w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg cursor-pointer'
        />
      </form>

      {/* --- Bulk Upload Section --- */}
      <div className="max-w-md w-full bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl p-8 space-y-4">
        <p className='text-2xl font-bold'>Bulk Upload (Excel)</p>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mb-4" />

        {excelData.length > 0 && (
          <>
            <table className="w-full border-collapse border border-gray-300 mb-4 text-sm">
              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key} className="border p-2">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="border p-2">{val as string}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <button 
              onClick={handleBulkUpload} 
              className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg"
            >
              Upload to API
            </button>
          </>
        )}
      </div>
    </div>
  )
}
