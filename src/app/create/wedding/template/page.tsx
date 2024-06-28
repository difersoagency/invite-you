"use client"

import HeadDashboard from '@/app/dashboard/headDashboard'
import React, { useCallback, useEffect, useState } from 'react'
import stepList from '../../stepList'
import TemplateDiv from './TemplateDiv'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { getTemplateList } from '../../../../../services/manage'
import Cookies from 'js-cookie'

export default function Page() {
  const [template,setTemplate] = useState("");
  const [templateList, setTemplatelist] = useState([]);
  const router = useRouter();
  

  if (typeof window !== "undefined") {
    const undanganFormStr = localStorage.getItem('undanganForm');
    const undanganForm = JSON.parse(undanganFormStr);
  }else{
    console.warn('localStorage is not available');
  }

  const token = Cookies.get('token');
  if(!token) {
    router.push('/login');
    }

  const getTemplateListAPI = useCallback( async () =>{
    const data = await getTemplateList(undanganForm.acara)
    setTemplatelist(data.data)
  
    if(data.status > 300 ){
      toast.error(data.message)
    }
  
    },[templateList])

    useEffect(()=>{
      getTemplateListAPI()
      
    },[])
  const onSubmit = () => 
  {
    if(template == ''){
      toast.error('Pilih Salah Satu Template')
    }else{
   
    undanganForm.template = template;
    localStorage.setItem('undanganForm', JSON.stringify(undanganForm));
    router.push('/create/wedding/detail')
    }
  }


  return (
    <>
    <section>
      <HeadDashboard/>

      <div className='px-10 py-7 text-center'>
        {/* {stepList()} */}
        
        <div className='mt-10 grid grid-cols-1 md:grid-cols-3 h-[60vh] gap-11 overflow-y-scroll mb-7'>
          {templateList.map((option)=>(
              // <TemplateDiv key={templates.id} image={templates.preview_img} value={templates.id} nama={templates.nama} select={template}  onChange={setTemplate} />
              <div key={option.id}>
              <input type="radio" id={option.id} name="hosting" value={option.id} className="hidden peer" required  onChange={() => setTemplate(option.id)} checked={template === option.id} />
              <label htmlFor={option.id} className="inline-flex items-center justify-between w-full p-5 text-dark bg-white peer-checked:border rounded-lg cursor-pointer  peer-checked:border-gold peer-checked:text-gold peer-checked:bg-cream hover:text-gold hover:bg-cream  ">                           
                  <div className="block">
                      <img src={option.preview_img} alt="" width={300} height={200}/>
                      <p className='mt-2 text-xs font-bold'>{option.nama}</p>
                  </div>
              </label>
          </div>
       ))} 






      {/* 
          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-2' nama='Template Wedding 2' select={template}   onChange={setTemplate}/>

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-3' nama='Template Wedding 3' select={template}    onChange={setTemplate} />

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-4' nama='Template Wedding 4'select={template}   onChange={setTemplate} />

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-5' nama='Template Wedding 5' select={template}   onChange={setTemplate}/>

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-6' nama='Template Wedding 6' select={template}   onChange={setTemplate}/> */}
          
        </div>
        
        <button className='px-6 mx-auto py-2 text-xs bg-gold text-white rounded-md' onClick={onSubmit}>Next</button>
      </div>
    </section>
    <ToastContainer></ToastContainer>
    </>
  )
}
