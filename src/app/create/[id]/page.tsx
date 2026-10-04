"use client"

import React, { useCallback, useEffect, useState } from 'react'
import FieldCreate from '../../component/FieldCreate'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { getProjectDetail } from '../../../../services/manage'
import AppShell from '@/app/component/ui/AppShell'
import PageHeader from '@/app/component/ui/PageHeader'
import Stepper from '@/app/component/ui/Stepper'
import SectionCard from '@/app/component/ui/SectionCard'
import EventTypePicker from '@/app/component/ui/EventTypePicker'
import FormActions from '@/app/component/ui/FormActions'
import { CalendarIcon, UserIcon } from '@/app/component/icon/Icons'

export default function Create({params}:{ params: {id:string}}) {
  const token = Cookies.get('token');
  const router = useRouter();
  const [namaKlien,setNamaklien] = useState('');
  const [emailKlien,setEmailklien] = useState('');
  const [acara,setAcara] = useState('');
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/;

  const getProjectDetailAPI = useCallback(async (id : any) =>{
    const data = await getProjectDetail(id)

    if(data.status > 300 ){
      toast.error(data.message)
    }

    setNamaklien(data.data.namaKlien)
    setEmailklien(data.data.emailKlien)
    setAcara(data.data.acara)
   },[])

    useEffect(()=>{
      if(params.id) {
        getProjectDetailAPI(params.id)
      }else{
        console.log('error')
      }
    },[params.id, getProjectDetailAPI])

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
      router.push(`/create/${acara}/template/${params.id}`)
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
    <AppShell>
      <Stepper current={0} />
      <PageHeader eyebrow="Edit Undangan · Langkah 1 dari 3" title="Data Klien" description="Perbarui data customer. Semua kolom wajib diisi." />

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Informasi Klien" description="Digunakan untuk identitas pemilik undangan." icon={<UserIcon />}>
          <FieldCreate type="text" usefor='namaKlien' value={namaKlien} onChange={setNamaklien} label='Nama Klien' placeholder='Nama lengkap klien'/>
          <FieldCreate type="email" usefor='emailKlien' label='Email Klien' value={emailKlien} onChange={setEmailklien} placeholder='klien@email.com'/>
        </SectionCard>

        <SectionCard title="Jenis Acara" description="Jenis acara tidak dapat diubah saat edit." icon={<CalendarIcon />}>
          {acara ? (
            <EventTypePicker value={acara} onChange={setAcara} only={acara} />
          ) : (
            <div className="h-20 animate-pulse rounded-2xl bg-gold-50" />
          )}
        </SectionCard>
        <button type="submit" className="hidden" aria-hidden tabIndex={-1} />
      </form>

      <FormActions onSubmit={onSubmit} submitLabel="Lanjut pilih template" />
    </AppShell>
     <ToastContainer position="top-center"></ToastContainer>
     </>
  )
}
