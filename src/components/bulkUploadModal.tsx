'use client'

import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

export default function BulkUploadModal() {
  const [excelData, setExcelData] = useState<any[]>([]);
  const router = useRouter();

  // ✅ Convert Excel serial date to YYYY-MM-DD
  const excelDateToString = (serial: number) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split("T")[0];
  };

  // ✅ Capitalize each word (for status)
  const capitalizeWords = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // ✅ Excel upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json<any>(worksheet);

      const formatted = json.map((row) => {
        const newRow: any = {};
        Object.keys(row).forEach((key) => {
          let value = row[key];
          if ((key.toLowerCase() === "date_created" || key.toLowerCase() === "date_updated") && typeof value === "number") {
            value = excelDateToString(value);
          } else if (typeof value === "string") {
            value = capitalizeWords(value);
            if (key.toLowerCase() === "status") {
              value = capitalizeWords(value);
            }
          }
          newRow[key.toLowerCase()] = value;
        });
        return newRow;
      });

      setExcelData(formatted);
    };
    reader.readAsBinaryString(file);
  };

  // ✅ Send Excel data to API
  
  const handleBulkUpload = async () => {
    if (excelData.length === 0) {
      toast.error("⚠️ No data to upload");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}bulk/`, excelData);
      toast.success("Bulk data uploaded!");
      setTimeout(() => {
        router.push("/pouch");
      }, 800); // small delay so toast is visible
    } catch (error: any) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("Upload failed!");
    }
  };

  return (
    <div>
        <p className="text-gray-600">Upload your Excel file here for bulk outbound logging.</p>
        <input 
            type="file" 
            accept=".xlsx, .xls" 
            onChange={handleFileUpload} 
            className="cursor-pointer block w-full text-sm text-gray-900 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 
                       file:rounded-full file:border-0 
                       file:text-sm file:font-semibold 
                       file:bg-blue-50 file:text-blue-600 
                       hover:file:bg-blue-100"
          />
        
        <div className='mt-6 flex flex-col gap-4'>
            {/* Preview Table */}
            {excelData.length > 0 && (
            <>
                <div className="overflow-x-auto rounded-2xl border border-gray-300/40 shadow-inner max-h-80">
                <table className="w-full text-sm text-gray-800 dark:text-gray-200">
                    <thead className="bg-white/50 dark:bg-slate-700/40 sticky top-0">
                      <tr>
                          {Object.keys(excelData[0]).map((key) => (
                          <th key={key} className="px-4 py-2 text-left font-semibold">{key}</th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                    {excelData.map((row, idx) => (
                        <tr key={idx} className="odd:bg-white/30 even:bg-white/10 dark:odd:bg-slate-800/20 dark:even:bg-slate-700/20">
                        {Object.values(row).map((val, i) => (
                            <td key={i} className="px-4 py-2">{val as string}</td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

                {/* Upload Button */}
                <button 
                onClick={handleBulkUpload} 
                className="w-full py-3 rounded-xl text-white font-semibold shadow-lg transition bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 cursor-pointer"
                >
                🚀 Upload to API
                </button>
            </>
            )}
        </div>
    </div>
  )
}
