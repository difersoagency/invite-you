"use client"

import React, { useState } from 'react'
import headDashboard from '../dashboard/headDashboard'
import FieldCreate from '../component/FieldCreate'
import { Radio, RadioGroup } from '@nextui-org/react'
import stepList from './stepList'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function create() {
  const token = Cookies.get('token');
  const router = useRouter();
  const [namaKlien,setNamaklien] = useState('');  
  const [emailKlien,setEmailklien] = useState('');  
  const [acara,setAcara] = useState('');  


  const onSubmit = () => {
    console.log(namaKlien)
    console.log(emailKlien)
    console.log(acara)
    const undanganForm = {
      namaKlien,
      emailKlien,
      acara
    }
    localStorage.setItem('undanganForm',JSON.stringify(undanganForm))
    // if wedding
    router.push('/create/wedding/template')
  }


  
  // if(!token) {
  //   router.replace('/login');
  //   }
 

  return (
    <section>
        {headDashboard()}

          <div className='px-10 py-7'>

            {/* Step Navigator */}
            {/* {stepList()} */}
            
            {/* Step Content */}
            <form action="">
              <div className='mt-10 grid grid-cols-2 mb-4'>
                <div>
                  <div>
                    <FieldCreate usefor='namaKlien' value={namaKlien} onChange={setNamaklien}  label='Nama Klien' classLabel='font-bold mb-3 text-sm' classInput='w-1/2 px-4 py-2 border border-gold rounded-lg mt-2'/>
                  </div>

                  <div className='mt-2 mb-3'>
                    <FieldCreate usefor='emailKlien' label='Email Klien' value={emailKlien} onChange={setEmailklien} classLabel='font-bold text-black mb-3 text-sm' classInput='w-1/2 px-4 py-2 border border-gold rounded-lg mt-2'/>
                  </div>
                </div>

                <div className='mt-3'>
                  <RadioGroup label='Pilih Kebutuhan Acara Anda' size='sm' value={acara} onChange={(event => setAcara(event.target.value))}>
                    <Radio className='text-xs text-gold' value="birthday" >Birthday</Radio>
                    <Radio className='text-xs text-gold' value="wedding">Wedding</Radio>
                    <Radio className='text-xs text-gold' value="engagement">Engagement</Radio>
                    <Radio className='text-xs text-gold' value="other">Other</Radio>
                  </RadioGroup>
                </div>
              </div>
              <button type="button"  onClick={onSubmit} className='mt-9 px-6 py-2 text-xs bg-gold text-white rounded-md'>Next</button>
            </form>

          </div>
    </section>
  )
}
