"use client"

import React, { useEffect, useState } from 'react'

export default function FieldDetail(props:any) {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);


  const handleChange = (e:any) => {
    setValue(e.target.value);
    if(props.onChange){
      props.onChange(e.target.value);
    }
  }

  return (
    <div className=''>
      <label htmlFor={props.usefor} className='font-bold text-left text-xs'>{props.label}</label>
      <p className='text-gray text-[0.6rem] mb-2 '>{props.desc}</p>
      <input type={props.type} name={props.usefor} id={props.usefor} placeholder={props.placeholder}  className='border border-gold px-4 py-3 text-xs  w-2/3'  value={value}  onChange={handleChange} />
    </div>
  )
}
