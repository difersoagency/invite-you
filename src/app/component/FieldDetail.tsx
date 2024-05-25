import React, { useState } from 'react'

export default function FieldDetail(props:any) {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    if(props.onChange){
      props.onChange(e.target.value);
    }
  }

  return (
    <div className=''>
      <label htmlFor={props.usefor} className='font-bold text-left text-xs'>{props.label}</label>
      <p className='text-gray text-[0.6rem] mb-2 '>{props.desc}</p>
      <input type={props.type} name={props.usefor} id={props.usefor} placeholder={props.placeholder}  className='border-2 border-gold px-3 py-2 text-xs rounded-lg w-2/3'  value={props.value || value}  onChange={handleChange} />
    </div>
  )
}
