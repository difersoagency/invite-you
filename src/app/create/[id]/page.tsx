"use client"

import React, { useCallback, useEffect, useState } from 'react'
import HeadDashboard from '../../dashboard/HeadDashboard'
import FieldCreate from '../../component/FieldCreate'
import { Radio, RadioGroup } from '@nextui-org/react'
import stepList from '../stepList'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { getProjectDetail } from '../../../../services/manage'

export default function Create({params}:{ params: {id:string}}) {
  const [projectDetail, setProjectDetail] = useState([]);
  const token = Cookies.get('token');
  const router = useRouter();
  const [namaKlien,setNamaklien] = useState('');  
  const [emailKlien,setEmailklien] = useState('');  
  const [acara,setAcara] = useState('');  
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  
  

  const getProjectDetailAPI = useCallback(async (id : any) =>{
    const data = await getProjectDetail(id)

    if(data.status > 300 ){
      toast.error(data.message)
    }
    
    // setProjectDetail(data)
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
    },[params.id])



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
      router.push(`/create/wedding/template/${params.id}`)
      
          } else {
            toast.error('Email Tidak Valid')
          }
    }
   
  }

  // if(!token) {
  //   router.replace('/login');
  //   }
 

  return (
    <>
    <section>
        <HeadDashboard/>

          <div className='px-10 py-7'>

            {/* Step Navigator */}
            {/* {stepList()} */}
            
            {/* Step Content */}
            <form action="">
              <div className='mt-10 grid grid-cols-2 mb-4'>
                <div>
                  <div>
                    <FieldCreate type="text"  usefor='namaKlien' value={namaKlien} onChange={setNamaklien}  label='Nama Klien' classLabel='font-bold mb-3 text-sm' classInput='w-1/2 px-4 py-2 border border-gold rounded-lg mt-2'/>
                  </div>

                  <div className='mt-2 mb-3'>
                    <FieldCreate type="email"  usefor='emailKlien' label='Email Klien' value={emailKlien} onChange={setEmailklien} classLabel='font-bold text-black mb-3 text-sm' classInput='w-1/2 px-4 py-2 border border-gold rounded-lg mt-2'/>
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
     <ToastContainer></ToastContainer>
     </>
  )
}
