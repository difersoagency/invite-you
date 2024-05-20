import React from 'react'

export default function FieldCreate(props:any) {
  return (
    <div className='mt-4'>
      <label htmlFor={props.usefor} className={props.classLabel}>{props.label}</label>
      <br />
      <input type="text" name={props.usefor} id={props.usefor}  className={props.classInput}/>
    </div>
  )
}
