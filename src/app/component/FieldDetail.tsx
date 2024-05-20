import React from 'react'

export default function FieldDetail(props:any) {
  return (
    <div className=''>
      <label htmlFor={props.usefor} className='font-bold text-left text-xs'>{props.label}</label>
      <p className='text-gray text-[0.6rem] mb-2 '>{props.desc}</p>
      <input type={props.type} name={props.usefor} id={props.usefor} placeholder={props.placeholder}  className='border-2 border-gold px-3 py-2 text-xs rounded-lg w-2/3' required/>
    </div>
  )
}
