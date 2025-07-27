import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from 'react-slick';

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };
  const [categories, setCategories] = useState([])

  async function getCategories() {

    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    // console.log(data);
    setCategories(data.data)
  }
  useEffect(() => {
    getCategories();
  }, [])

  return <>
    <Slider {...settings}>
      {categories.map((category, index) => <div key={index} className='my-3'>
          <img src={category.image} alt={category.name} className='w-full h-[100px] lg:h-[200px] object-cover object-top' />
          <h3 className='text-xs text-center lg:text-lg'>{category.name}</h3>
      </div>)}
    </Slider>

  </>
}
