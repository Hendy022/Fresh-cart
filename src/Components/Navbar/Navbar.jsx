import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext.jsx'
import { CartContext } from '../../context/CartContext.jsx'
import { useSelector } from 'react-redux'

export default function Navbar() {

  let {  userToken, setUserToken } = useContext(UserContext)
  let { cart } = useContext(CartContext);
  const [open, setopen] = useState(false);
  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login')
  }

  let {count} = useSelector((x)=> x.counterReducer)

  return <>

    <header className="fixed bg-white dark:bg-gray-800   shadow inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
        <div className="flex me-6">
          <NavLink to={''} className="-m-1.5 p-1.5 dark:bg-gray-400 dark:rounded">
            <span className="sr-only">Your Company</span>
            <img className="w-28" src={logo} alt="" />
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button type="button" onClick={() => setopen(true)} className="-m-2.5 bg-gray-200 hover:bg-gray-300 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        {userToken && <div className="hidden lg:flex lg:gap-x-4">
          <NavLink to={'/'} className="text-sm/6 dark:text-gray-50 text-gray-600">Home  </NavLink>
          <NavLink to={'brands'} className="text-sm/6 dark:text-gray-50 text-gray-600">Brands</NavLink>
          <NavLink to={'products'} className="text-sm/6 dark:text-gray-50 text-gray-600">Products</NavLink>
          <NavLink to={'categories'} className="text-sm/6 dark:text-gray-50 text-gray-600">Categories</NavLink>
          <NavLink to={'wishlist'} className="text-sm/6 dark:text-gray-50 text-gray-600">Wishlist</NavLink>
          <NavLink to={'addresses'} className="text-sm/6 dark:text-gray-50 text-gray-600">Addresses</NavLink>
          <NavLink to={'profile'} className="text-sm/6 dark:text-gray-50 text-gray-600">Profile</NavLink>
          <NavLink to={'allorders'} className="text-sm/6 dark:text-gray-50 text-gray-600">Orders</NavLink>
        </div>}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">

          {userToken ?
            <>
              <NavLink to={'cart'} className="text-sm/6 relative dark:text-gray-50 text-gray-600"><i className='fas fa-shopping-cart fa-xl'></i> <span className=' text-white dark:text-main dark:font-bold absolute -top-1 font-medium left-2.5 hover:dark:text-white '>{cart?.numOfCartItems}</span> </NavLink>
              <span onClick={() => logOut()} className="text-sm/6 dark:text-gray-50 cursor-pointer text-gray-600">LogOut </span>
            </>
            :
            <>

              <NavLink to={'register'} className="text-sm/6 dark:text-gray-50 text-gray-600">register</NavLink>
              <NavLink to={'login'} className="text-sm/6 dark:text-gray-50 text-gray-600">Login <span aria-hidden="true">→</span></NavLink>

            </>
          }
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      <div className={open ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
        {/* Background backdrop, show/hide based on slide-over state. */}
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to={''} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="w-28" src={logo} alt="" />
            </NavLink>
            <button type="button" onClick={() => setopen(false)} className="-m-2.5 rounded-md p-2.5 bg-white hover:bg-gray-100 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">

                <NavLink to={'/'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Home</NavLink>
                <NavLink to={'cart'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Cart</NavLink>
                <NavLink to={'brands'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Brands</NavLink>
                <NavLink to={'products'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Products</NavLink>
                <NavLink to={'categories'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Categories</NavLink>
                <NavLink to={'wishlist'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Wishlist</NavLink>
                <NavLink to={'addresses'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Addresses</NavLink>
                <NavLink to={'profile'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Profile</NavLink>
                <NavLink to={'allorders'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Orders</NavLink>
              </div>
              <div className="py-6">
                <NavLink to={''} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Register</NavLink>
                <NavLink to={'login'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Login</NavLink>
                <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">LogOut</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>



  </>
}
