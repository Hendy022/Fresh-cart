import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {

  return <main className='bg-gray-200 dark:text-gray-50 min-h-screen dark:bg-gray-900'>
    <Navbar/>

    <div className="container min-h-[400px]  mt-12">
      <Outlet></Outlet>
    </div>

    <Footer/>
  
  </main>
}
