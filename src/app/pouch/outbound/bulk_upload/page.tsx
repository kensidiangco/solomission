'use client'

import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

export default function BulkUpload() {
  const [excelData, setExcelData] = useState<any[]>([]);
  const router = useRouter();

  // ✅ Convert Excel serial date to YYYY-MM-DD
  const excelDateToString = (serial: number) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split("T")[0]; // "YYYY-MM-DD"
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

      // ✅ Process rows
      const formatted = json.map((row) => {
        const newRow: any = {};
        Object.keys(row).forEach((key) => {
          let value = row[key];

          // ✅ Convert Excel serial dates
          if ((key.toLowerCase() === "date_created" || key.toLowerCase() === "date_updated") && typeof value === "number") {
            value = excelDateToString(value);
          } else if (typeof value === "string") {
            // ✅ lowercase all values
            value = value.toLowerCase();

            // ✅ status field => capitalize each word
            if (key.toLowerCase() === "status") {
              value = capitalizeWords(value);
            }
          }

          // ✅ make all keys lowercase
          newRow[key.toLowerCase()] = value;
        });
        return newRow;
      });

      console.log("Parsed & Formatted Excel:", formatted);
      setExcelData(formatted);
    };
    reader.readAsBinaryString(file);
  };

  // ✅ Send Excel data to API
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
      console.log("Excel Data:", excelData);
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row gap-10 justify-center items-start md:items-center p-6'>
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
