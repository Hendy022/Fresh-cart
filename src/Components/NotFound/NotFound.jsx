import React from 'react'
import style from './NotFound.module.css'

import errImage from '../../assets/images/error.svg'
export default function NotFound() {

  return <div className='flex justify-center items-center pt-6'>
    
    <img src={errImage} className='text-center' alt="" />
  </div>
}
