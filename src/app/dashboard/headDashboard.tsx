import React from 'react'
import Image from 'next/image'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function headDashboard() {
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
            <a href="/dashboard" className="link-menu text-sm mr-9 hover:font-bold">List Customer</a>
            <a href="/create" className="link-menu text-sm hover:font-bold">Buat Undangan</a>
        </div>

        <div>
            <button onClick={logoutHanlder} className='text-sm font-bold hover:text-gold'>Log Out</button>
        </div>
    </header>
  )
}
