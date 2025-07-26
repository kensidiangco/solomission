import React from 'react'

export default function Invent() {
  return (
    <div className='h-screen flex gap-50 justify-center items-center'>
      <div className='p-2 text-center flex flex-col gap-4'>
        <p className='font-bold text-5xl'>Lahat ng pouch na papasok</p>
        <p className='font-bold text-4xl'>Dito ila-log</p>
        <p className='font-bold text-3xl'>Para lamang alam ko</p>
      </div>
  
      <div className='flex flex-col p-4 gap-2'>

        <p className='text-2xl font-bold'>Stock In</p>

        <form action=""  className="flex flex-col gap-4 flex flex-col gap-4 p-2 bg-gradient-to-r from-stone-50 to-slate-100 shadow">
          <select name="size" id="" className='p-2 rounded border'>
            <option value="s">S</option>  
            <option value="m">M</option>  
            <option value="l">L</option>  
          </select>    
          <input type="number" name="qty" id="" placeholder="QTY" className='p-2 rounded border'/>
          <input type="submit" value="Submit" className='bg-blue-500 p-3 rounded cursor-pointer text-white'/>
        </form>
  
      </div>
    </div>
  )
}
