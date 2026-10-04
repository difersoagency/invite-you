"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { CloseIcon, EnvelopeIcon, LogoutIcon, MenuIcon, MusicIcon, UsersIcon } from '../component/icon/Icons';

const MENU = [
  { href: '/dashboard', label: 'List Customer', icon: UsersIcon },
  { href: '/create', label: 'Buat Undangan', icon: EnvelopeIcon },
  { href: '/music', label: 'List Music', icon: MusicIcon },
];

export default function HeadDashboard() {
  const router = useRouter();
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);

  const logoutHanlder = async () => {
    Cookies.remove("token");
    router.push('/');
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className='sticky top-0 z-40 border-b border-gold-100 bg-white/85 backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8'>
        <Link href="/dashboard" className='shrink-0'>
          <Image src="/logo.png" width={500} height={142} alt='Logo Invite You Invitation' className='h-9 w-auto' priority />
        </Link>

        <nav className='hidden items-center gap-1 md:flex'>
          {MENU.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm transition ${
                isActive(href) ? 'bg-gold-50 font-semibold text-gold-600' : 'text-dark/70 hover:bg-gold-50/60 hover:text-dark'
              }`}
            >
              <Icon className='h-4 w-4' /> {label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <button onClick={logoutHanlder} className='btn-outline hidden px-4 py-2 md:inline-flex'>
            <LogoutIcon className='h-4 w-4' /> Log Out
          </button>
          <button
            type='button'
            aria-label='Buka menu'
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className='flex h-10 w-10 items-center justify-center rounded-xl text-xl text-dark hover:bg-gold-50 md:hidden'
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav className='border-t border-gold-100 bg-white px-4 pb-4 pt-2 md:hidden'>
          {MENU.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${
                isActive(href) ? 'bg-gold-50 font-semibold text-gold-600' : 'text-dark/80'
              }`}
            >
              <Icon className='h-5 w-5' /> {label}
            </Link>
          ))}
          <button onClick={logoutHanlder} className='mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 hover:bg-red-50'>
            <LogoutIcon className='h-5 w-5' /> Log Out
          </button>
        </nav>
      )}
    </header>
  )
}
