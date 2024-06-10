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
    <div className='mt-4'>
      <label htmlFor={props.usefor} className={props.classLabel}>{props.label}</label>
      <br />
      <input type={props.type} name={props.usefor} id={props.usefor}  className={props.classInput}  value={props.value || value}  onChange={handleChange}/>
    </div>
  )
}
