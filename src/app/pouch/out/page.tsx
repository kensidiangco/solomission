import React from 'react'

export default function PouchOut() {
  return (
    <div className='min-h-screen flex gap-50 justify-center items-center'>
      <div className='p-2 text-center flex flex-col gap-4'>
        <p className='font-bold text-5xl'>Lahat ng pouch na lalabas</p>
        <p className='font-bold text-4xl'>Dito ila-log</p>
        <p className='font-bold text-3xl'>Para lamang alam ko</p>
      </div>

      <form action="" className="max-w-md w-full bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg bg-clip-padding rounded-2xl border border-white/30 shadow-2xl p-8 space-y-4">

        <p className='text-2xl font-bold'>Stock Out</p>

        <label className="block mb-1 text-gray-700">Getter</label>
        <input type="text" name="getter" id="" placeholder="Input the name of getter" className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none focus:bg-gray-900/25 transition-colors'/>
        
        <label className="block mb-1 text-gray-700">Size</label>
        <select name="size" id="" className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 backdrop-blur bg-clip-padding focus:outline-none focus:bg-gray-900/25 transition-colors'>
          <option defaultValue selected disabled>Select Size</option>
          <option value="s">S</option>  
          <option value="m">M</option>  
          <option value="l">L</option>  
        </select>    
        
        <label className="block mb-1 text-gray-700">Quantity</label>
        <input type="number" name="qty" id="" placeholder="QTY" className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none focus:bg-gray-900/25 transition-colors'/>

        <label className="block mb-1 text-gray-700">Purpose</label>
        <input type="text" name="purpose" id="" placeholder="Type your purpose" className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none focus:bg-gray-900/25 transition-colors'/>
        
        <label className="block mb-1 text-gray-700">Given</label>
        <input type="text" name="given" id="" placeholder="Type who will be given" className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 focus:outline-none focus:bg-gray-900/25 transition-colors'/>

        <label className="block mb-1 text-gray-700">Status</label>
        <select name="status" id=""className='w-full px-4 py-3 rounded-lg bg-gray-900/20 text-gray-900 placeholder-gray-700/50 backdrop-blur bg-clip-padding focus:outline-none focus:bg-gray-900/25 transition-colors'>
          <option selected disabled>Select Status</option>
          <option value="free">Free</option>
          <option value="np">Not Paid</option>  
          <option value="p">Paid</option>  
        </select>      
        <input type="submit" value="Submit" className='w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors'/>
      </form>
  
    </div>
  )
}
