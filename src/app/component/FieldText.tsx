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
    <div className='mt-4'>
      <label htmlFor={props.usefor} className=' text-left text-xs'>{props.label}</label>
      <br />
      <input type={props.type} name={props.usefor} id={props.usefor}  className='border border-gold px-3 py-2 text-xs w-[20vw] ' placeholder={props.usefor}  value={props.value || value} // controlled component value
        onChange={handleChange} />
    </div>
  )
}
