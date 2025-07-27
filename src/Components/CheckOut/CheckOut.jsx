import React, { useContext, useState } from 'react'
import style from './CheckOut.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext.jsx'
import { CartContext } from '../../context/CartContext.jsx'
import toast from 'react-hot-toast'

export default function CheckOut() {

  const [apiError, setapiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let { cart } = useContext(CartContext)

  async function handleCheckOut(shippingAddress) {
    // call Api
    try {
      setIsLoading(true);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`, {
        shippingAddress
      }, {
        headers:{
          token : localStorage.getItem('userToken')
        }
      });
      console.log(data);
      toast.success(data.status)
      location.href = data.session.url

    } catch (err) {
      console.log(err.response.data.message);
      setapiError(err.response.data.message);
      setIsLoading(false)
    }

  }


  let formik = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone: '',
    }, onSubmit: handleCheckOut
  })

  return <>

    <div>
      <h2>CheckOut</h2>
      <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto">


        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your city :</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your details :</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your phone :</label>
        </div>


        {isLoading ? <button type="button" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-light font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">
          <i className='fas fa-spinner fa-spin'></i>
        </button> : <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-light font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button>
        }

      </form>
    </div>


  </>
}
