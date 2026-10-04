"use client"

import React, {useState} from 'react'

export default function FieldText(props:any) {
  const [value, setValue] = useState('');

  const handleChange = (e :any) => {
    setValue(e.target.value);
    if(props.onChange){
      props.onChange(e.target.value);
    }
  }

  return (
    <div>
      <label htmlFor={props.usefor} className='mb-1.5 block text-sm font-medium text-dark'>{props.label}</label>
      <div className='relative'>
        <input type={props.type} name={props.usefor} id={props.usefor} className={`input-base py-3 ${props.trailing ? 'pr-12' : ''}`} placeholder={props.placeholder} autoComplete={props.autoComplete} value={props.value || value}
          onChange={handleChange} />
        {props.trailing && <div className='absolute inset-y-0 right-0 flex items-center pr-2'>{props.trailing}</div>}
      </div>
    </div>
  )
}
