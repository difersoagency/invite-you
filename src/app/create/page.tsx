"use client"

import React, { useState } from 'react'
import FieldCreate from '../component/FieldCreate'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import AppShell from '../component/ui/AppShell'
import PageHeader from '../component/ui/PageHeader'
import Stepper from '../component/ui/Stepper'
import SectionCard from '../component/ui/SectionCard'
import EventTypePicker from '../component/ui/EventTypePicker'
import FormActions from '../component/ui/FormActions'
import { CalendarIcon, UserIcon } from '../component/icon/Icons'

export default function Create() {
  const token = Cookies.get('token');
  const router = useRouter();
  const [namaKlien,setNamaklien] = useState('');
  const [emailKlien,setEmailklien] = useState('');
  const [acara,setAcara] = useState('');
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/;

  const onSubmit = () => {
    if(namaKlien == '' || emailKlien == '' || acara == ''){
      toast.error('Lengkapi Form')
    }else{

      if (regEx.test(emailKlien)) {

      const undanganForm = {
        namaKlien,
        emailKlien,
        acara
      }

      localStorage.setItem('undanganForm',JSON.stringify(undanganForm))
      router.push(`/create/${acara}/template`)
        } else {
          toast.error('Email Tidak Valid')
        }
    }
  }

  if(!token) {
    router.push('/login');
    }

  return (
    <>
    <AppShell narrow>
      <Stepper current={0} />
      <PageHeader eyebrow="Undangan baru" title="Data klien" description="Semua kolom wajib diisi." />

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-6">
        <SectionCard title="Informasi klien" icon={<UserIcon />}>
          <FieldCreate type="text" usefor='namaKlien' value={namaKlien} onChange={setNamaklien} label='Nama klien' placeholder='Nama lengkap klien'/>
          <FieldCreate type="email" usefor='emailKlien' label='Email klien' value={emailKlien} onChange={setEmailklien} placeholder='klien@email.com'/>
        </SectionCard>

        <SectionCard title="Jenis acara" icon={<CalendarIcon />}>
          <EventTypePicker value={acara} onChange={setAcara} />
        </SectionCard>
        <button type="submit" className="hidden" aria-hidden tabIndex={-1} />
      </form>

      <FormActions onSubmit={onSubmit} submitLabel="Lanjut" showBack={false} />
    </AppShell>
     <ToastContainer position="top-center" hideProgressBar theme="dark"></ToastContainer>
     </>
  )
}
