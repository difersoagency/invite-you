"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { EnvelopeIcon, LogoutIcon, MusicIcon, UsersIcon } from '../component/icon/Icons';

const MENU = [
  { href: '/dashboard', label: 'Klien', icon: UsersIcon },
  { href: '/create', label: 'Buat undangan', short: 'Buat', icon: EnvelopeIcon },
  { href: '/music', label: 'Musik', icon: MusicIcon },
];

// Navigasi utama: sidebar hitam di layar besar, bar atas + menu bawah di HP.
export default function HeadDashboard() {
  const router = useRouter();
  const pathname = usePathname() || '';

  const logoutHanlder = async () => {
    Cookies.remove("token");
    router.push('/');
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Sidebar (lg ke atas) */}
      <aside className='fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-ink text-white lg:flex'>
        <div className='flex h-20 items-center px-6'>
          <Link href="/dashboard">
            <Image src="/logo.png" width={500} height={142} alt='Logo Invite You Invitation' className='h-8 w-auto brightness-0 invert' priority />
          </Link>
        </div>

        <p className='px-6 pb-2 text-[11px] font-medium text-white/35'>Menu</p>
        <nav className='flex flex-col gap-0.5 px-3'>
          {MENU.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  active ? 'bg-white/[0.08] text-white' : 'text-white/55 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                {active && <span className='absolute -left-3 top-2 bottom-2 w-0.5 rounded-r bg-gold' />}
                <Icon className={`h-[18px] w-[18px] ${active ? 'text-gold' : ''}`} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className='mt-auto border-t border-white/10 p-3'>
          <button onClick={logoutHanlder} className='flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white'>
            <LogoutIcon className='h-[18px] w-[18px]' /> Keluar
          </button>
        </div>
      </aside>

      {/* Bar atas (HP & tablet) */}
      <header className='sticky top-0 z-40 [@media(max-height:500px)_and_(max-width:1023px)]:static flex h-14 items-center justify-between bg-ink px-4 text-white sm:px-6 lg:hidden'>
        <Link href="/dashboard">
          <Image src="/logo.png" width={500} height={142} alt='Logo Invite You Invitation' className='h-7 w-auto brightness-0 invert' priority />
        </Link>
        <button onClick={logoutHanlder} aria-label='Keluar' className='-mr-2 flex h-10 w-10 items-center justify-center text-lg text-white/60 hover:text-white'>
          <LogoutIcon />
        </button>
      </header>

      {/* Menu bawah (HP & tablet) */}
      <nav className='fixed inset-x-0 bottom-0 z-40 grid h-[calc(4rem+env(safe-area-inset-bottom))] [@media(max-height:500px)_and_(max-width:1023px)]:h-12 grid-cols-3 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden'>
        {MENU.map(({ href, label, short, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center justify-center gap-1 text-[11px] ${active ? 'font-semibold text-ink' : 'text-ink/45'}`}
            >
              {active && <span className='absolute top-0 h-0.5 w-8 bg-gold' />}
              <Icon className='h-5 w-5' />
              <span className='[@media(max-height:500px)_and_(max-width:1023px)]:sr-only'>{short || label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  )
}
