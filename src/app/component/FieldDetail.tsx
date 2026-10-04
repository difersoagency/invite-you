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
    <div className={`min-w-0 ${props.className || ''}`}>
      <label htmlFor={props.usefor} className='label'>{props.label}</label>
      {props.desc && <p className='hint mb-2'>{props.desc}</p>}
      <input type={props.type} name={props.usefor} id={props.usefor} placeholder={props.placeholder} className='input-base' value={value || ''} onChange={handleChange} />
    </div>
  )
}
