import React from 'react'

export default function headerSection() {
  return (
    <header className='w-full bg-black text-white flex justify-between px-6 py-4'>
        <p>Header</p>
        <div className='flex'>
            <div className='w-4 h-4 bg-red-500 rounded-full mr-3 self-center'></div>
            <p>{}</p>
        </div>
    </header>
  )
}
