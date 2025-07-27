import React, { useContext } from 'react'
import style from './Home.module.css'
import Products from '../Products/Products.jsx'
import Cart from '../Cart/Cart.jsx'
import Brands from '../Brands/Brands.jsx'
import { UserContext } from '../../context/UserContext.jsx'
import RecentProducts from '../RecentProducts/RecentProducts.jsx'
import Loading from '../Loading/Loading.jsx'
import MainSlider from '../MainSlider/MainSlider.jsx'
import CategorySlider from '../CategorySlider/CategorySlider.jsx'

export default function Home() {


  return <>
    <MainSlider />
    <CategorySlider />
    <RecentProducts />
  </>
}
