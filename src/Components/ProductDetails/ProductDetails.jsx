import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import Loading from '../Loading/Loading.jsx';
import { CartContext } from '../../context/CartContext.jsx';

export default function ProductDetails() {
  let {addProductToCart} = useContext(CartContext)
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed: 2000
  };
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  
  async function getProduct(productId) {

    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);

    console.log(data);
    setProduct(data.data);
    setLoading(false)
  }
  useEffect(() => {
    getProduct(id)
  }, [])

  return <>

    <h2>ProductDetails</h2>
    {loading ? <Loading/> :
      <div className="flex p-8 items-center">
        <div className="w-1/4">
          <Slider {...settings}>
            {product.images.map((image , index) => <img key={index} src={image} className='w-full' alt={product.title} />)}
          </Slider>
        </div>
        <div className="w-3/4 p-6">
          <h2>{product.title}</h2>
          <p className='m-2 text-gray-600'>{product.description}</p>
          <p className=''>{product.category.name}</p>

          <div className="flex justify-between">
            <span>{product.price} EGP</span>
            <span> <i className='fas fa-star rating-color'></i> {product.ratingsAverage} </span>
          </div>
          <button onClick={()=> addProductToCart(product.id)} className='btn w-full'>Add To Cart</button>

        </div>
      </div>
    }
  </>
}
