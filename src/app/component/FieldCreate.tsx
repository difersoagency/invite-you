"use client"

import React, { useState } from 'react'

export default function FieldCreate(props:any) {
  const [value, setValue] = useState('');

  const handleChange = (e:any) => {
    setValue(e.target.value);
    if(props.onChange){
      props.onChange(e.target.value);
    }
  }

  return (
    <div>
      <label htmlFor={props.usefor} className={props.classLabel || 'mb-1.5 block text-sm font-medium text-dark'}>{props.label}</label>
      <input type={props.type} name={props.usefor} id={props.usefor} placeholder={props.placeholder} className={props.classInput || 'input-base'} value={props.value || value} onChange={handleChange}/>
    </div>
  )
}
