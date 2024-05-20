import React from 'react'
import Image from 'next/image'

export default function sideBar() {
  return (
    <header className='flex px-10 py-3'>
      <Image
        src="/logo.png"
        width={200}
        height={100}
        alt='Logo Invite You Invitation'
      />
    </header>
  )
}
