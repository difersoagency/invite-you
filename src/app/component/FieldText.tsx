import React from 'react'

export default function FieldText(props:any) {
  return (
    <div className='mt-4'>
      <label htmlFor={props.usefor} className='font-bold text-left text-xs'>{props.label}</label>
      <br />
      <input type="text" name={props.usefor} id={props.usefor}  className='border-2 border-gold px-3 py-2 text-xs rounded-lg '/>
    </div>
  )
}
