"use client"

import React, { useState } from 'react'
import FieldCreate from '../component/FieldCreate'
import { Radio, RadioGroup, cn } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import HeadDashboard from '../dashboard/headDashboard'



const CustomRadio = (props:any) => {
  const {children, ...otherProps} = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:bg-gold "
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default function Create() {
  const token = Cookies.get('token');
  const router = useRouter();
  const [namaKlien,setNamaklien] = useState('');  
  const [emailKlien,setEmailklien] = useState('');  
  const [acara,setAcara] = useState('');  
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

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
      // if wedding
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
    <section>
        {HeadDashboard()}

          <div className='px-10 py-14'>

            {/* Step Navigator */}
            {/* {stepList()} */}
            
            <h1 className='text-2xl font-bold '>Personal Data Details</h1>
            <p className='text-sm mt-3'>Masukan Data dari customer (*Wajib diisi)</p>

            {/* Step Content */}
            <form action="">
              <div className='mt-6 grid grid-cols-2 mb-4'>
                <div>
                  <div>
                    <FieldCreate type="text" usefor='namaKlien' value={namaKlien} onChange={setNamaklien}  label='Nama Klien*' classLabel='mb-3 text-sm' classInput='w-1/2 px-4 py-2 border border-gold  mt-2'/>
                  </div>
                </div>
                <div className='mt-2 mb-3'>
                    <FieldCreate type="email"  usefor='emailKlien' label='Email Klien*' value={emailKlien} onChange={setEmailklien} classLabel='text-black mb-3 text-sm' classInput='w-1/2 px-4 py-2 border border-gold  mt-2'/>
                </div>

                <div className='mt-6'>
                  <RadioGroup label='Pilih Kebutuhan Acara Anda' size='sm' orientation='horizontal' value={acara} onChange={(event => setAcara(event.target.value))}>
                    {/* <CustomRadio className='text-xs text-gold px-10' value="birthday" >Birthday</CustomRadio> */}
                    <CustomRadio className='text-xs text-gold px-10' value="wedding">Wedding</CustomRadio>
                    <CustomRadio className='text-xs text-gold px-10' value="engagement">Engagement</CustomRadio>
                  </RadioGroup>
                </div>
              </div>
              <button type="button"  onClick={onSubmit} className='mt-9 px-10 py-2 hover:bg-white hover:border-gold hover:text-gold hover:border transition-all bg-gold text-white rounded-md'>Next</button>
            </form>

          </div>
    </section>
     <ToastContainer></ToastContainer>
     </>
  )
}
