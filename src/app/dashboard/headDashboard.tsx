import React from 'react'
import Image from 'next/image'

export default function headDashboard() {
  return (
    <header className='flex justify-between px-10 py-3 bg-cream items-center'>
        <Image
        src="/logo.png"
        width={150}
        height={50}
        alt='Logo Invite You Invitation'
        />

        <div>
            <a href="/dashboard" className="link-menu text-sm mr-9 hover:font-bold">List Customer</a>
            <a href="/create" className="link-menu text-sm hover:font-bold">Buat Undangan</a>
        </div>

        <div>
            <a href='/' className='text-sm font-bold hover:text-gold'>Log Out</a>
        </div>
    </header>
  )
}
