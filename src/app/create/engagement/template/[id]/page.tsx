"use client"

import HeadDashboard from '@/app/dashboard/HeadDashboard'
import React, { useCallback, useEffect, useState } from 'react'
import stepList from '../../../stepList'
import TemplateDiv from '../TemplateDiv'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { getProjectDetail } from '../../../../../../services/manage'

export default function Page({params}:{ params: {id:string}}) {
  const [template,setTemplate] = useState("");
  const router = useRouter();




  const getProjectDetailAPI = useCallback(async (id) =>{
    const data = await getProjectDetail(id)
    // setProjectDetail(data)
    if(data.status > 300 ){
      toast.error(data.message)
    }
    setTemplate(data.data.template)
   },[])


    useEffect(()=>{
      if(params.id) {
        getProjectDetailAPI(params.id)
        
      }else{
        console.log('error')
      }
    },[params.id])


  const onSubmit = () => 
  {
    if(template == ''){
      toast.error('Pilih Salah Satu Template')
    }else{
    const undanganFormStr = localStorage.getItem('undanganForm');
    const undanganForm = JSON.parse(undanganFormStr);
    undanganForm.template = template;
    localStorage.setItem('undanganForm', JSON.stringify(undanganForm));
    router.push(`/create/wedding/detail/${params.id}`)
    }
  }


  return (
    <>
    <section>
      <HeadDashboard/>

      <div className='px-10 py-7 text-center'>
        {/* {stepList()} */}
        <div className='mt-10 grid grid-cols-1 md:grid-cols-3 h-[60vh] gap-11 overflow-y-scroll mb-7'>
          
          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-1' nama='Template Wedding 1' select={template}  onChange={setTemplate} />

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-2' nama='Template Wedding 2' select={template}   onChange={setTemplate}/>

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-3' nama='Template Wedding 3' select={template}    onChange={setTemplate} />

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-4' nama='Template Wedding 4' select={template}   onChange={setTemplate} />

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-5' nama='Template Wedding 5' select={template}   onChange={setTemplate}/>

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-6' nama='Template Wedding 6' select={template}   onChange={setTemplate}/>
          
        </div>
        
        <button className='px-6 mx-auto py-2 text-xs bg-gold text-white rounded-md' onClick={onSubmit}>Nexts</button>
      </div>
    </section>
    <ToastContainer></ToastContainer>
    </>
  )
}
