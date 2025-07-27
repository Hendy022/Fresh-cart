import React from 'react'
import style from './Footer.module.css'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/freshcart-logo.svg'


export default function Footer() {

  return <>


    <footer className="rounded-lg shadow-sm dark:bg-gray-900 py-4">
      <div className="w-full max-w-screen-xl mx-auto  md:py-8">
        <hr className="my-6 border-gray-400 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://freshcart.com/" className="hover:underline">Fresh Cart™</a>. All Rights Reserved.</span>
      </div>
    </footer>



  </>
}
