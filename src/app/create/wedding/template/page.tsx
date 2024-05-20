"use client"

import headDashboard from '@/app/dashboard/headDashboard'
import React from 'react'
import stepList from '../../stepList'
import TemplateDiv from './TemplateDiv'


export default function page() {
  return (
    <section>
      {headDashboard()}

      <div className='px-10 py-7 text-center'>
        {/* {stepList()} */}
        
        <div className='mt-10 grid grid-cols-1 md:grid-cols-3 h-[60vh] gap-11 overflow-y-scroll mb-7'>
          
          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-1' nama='Template Wedding 1'/>

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-2' nama='Template Wedding 2'/>

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-3' nama='Template Wedding 3'/>

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-4' nama='Template Wedding 4'/>

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-5' nama='Template Wedding 5'/>

          <TemplateDiv image='https://picsum.photos/300/200' value='wedding-6' nama='Template Wedding 6'/>
          
        </div>
        
        <a href='/create/wedding/detail' className='px-6 mx-auto py-2 text-xs bg-gold text-white rounded-md'>Next</a>
      </div>
    </section>
  )
}
