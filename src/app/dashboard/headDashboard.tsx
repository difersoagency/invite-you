// "use client"np

import React from 'react'
import Image from 'next/image'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function HeadDashboard() {
  const token = Cookies.get('token');
  const router = useRouter();

  const logoutHanlder = async () => {
    Cookies.remove("token");
    router.push('/');
};


  return (
    <header className='flex justify-between px-10 py-3 bg-cream items-center'>
        <Image
        src="/logo.png"
        width={150}
        height={50}
        alt='Logo Invite You Invitation'
        />

        <div>
            <a href="/dashboard" className="link-menu text-sm mr-9 hover:font-bold transition-all hover:bg-gold hover:text-white px-3 py-2 rounded-xl">List Customer</a>
            <a href="/create" className="link-menu text-sm mr-9 hover:font-bold transition-all hover:bg-gold hover:text-white px-3 py-2 rounded-xl">Buat Undangan</a>
            <a href="/music" className="link-menu text-sm mr-9 hover:font-bold transition-all hover:bg-gold hover:text-white px-3 py-2 rounded-xl">List Music</a>
        </div>

        <div>
            <button onClick={logoutHanlder} className='text-sm font-bold hover:text-gold rounded-lg text-white  hover:bg-white hover:border hover:border-gold transition-all bg-gold px-4 py-2'>Log Out</button>

        </div>
    </header>
  )
}
