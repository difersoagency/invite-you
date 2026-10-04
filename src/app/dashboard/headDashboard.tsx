"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { CloseIcon, LogoutIcon, MenuIcon } from '../component/icon/Icons';

const MENU = [
  { href: '/dashboard', label: 'Klien' },
  { href: '/create', label: 'Buat Undangan' },
  { href: '/music', label: 'Musik' },
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
    <header className='sticky top-0 z-40 bg-ink text-white'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-10'>
          <Link href="/dashboard" className='shrink-0'>
            <Image src="/logo.png" width={500} height={142} alt='Logo Invite You Invitation' className='h-8 w-auto brightness-0 invert' priority />
          </Link>

          <nav className='hidden h-16 items-stretch gap-7 md:flex'>
            {MENU.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center text-sm transition-colors ${
                  isActive(href) ? 'text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                {label}
                {isActive(href) && <span className='absolute inset-x-0 bottom-0 h-0.5 bg-gold' />}
              </Link>
            ))}
          </nav>
        </div>

        <button onClick={logoutHanlder} className='hidden items-center gap-2 text-sm text-white/55 transition-colors hover:text-white md:flex'>
          <LogoutIcon className='h-4 w-4' /> Keluar
        </button>

        <button
          type='button'
          aria-label='Buka menu'
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className='-mr-2 flex h-10 w-10 items-center justify-center text-xl md:hidden'
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav className='border-t border-white/10 px-4 pb-3 md:hidden'>
          {MENU.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between border-b border-white/10 py-3.5 text-sm ${
                isActive(href) ? 'text-white' : 'text-white/60'
              }`}
            >
              {label}
              {isActive(href) && <span className='h-1.5 w-1.5 rounded-full bg-gold' />}
            </Link>
          ))}
          <button onClick={logoutHanlder} className='flex w-full items-center gap-2 py-3.5 text-sm text-white/60'>
            <LogoutIcon className='h-4 w-4' /> Keluar
          </button>
        </nav>
      )}
    </header>
  )
}
