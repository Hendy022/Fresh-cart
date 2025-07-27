import React, { useContext, useEffect, useState } from 'react';
import style from './RecentProducts.module.css';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import Loading from '../Loading/Loading.jsx';
import useProducts from '../../Hooks/useProducts.jsx';
import ProductCard from '../Products/ProductCard';

export default function RecentProducts() {
  const { data, isLoading } = useProducts();
  const { userToken } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function fetchWishlist() {
      if (userToken) {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers: { token: userToken }
        });
        setWishlist(data.data.map(item => item._id));
      }
    }
    fetchWishlist();
  }, [userToken]);

  const handleWishlistChange = async () => {
    if (userToken) {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: userToken }
      });
      setWishlist(data.data.map(item => item._id));
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <h2>Recent Products</h2>
      <div className="flex flex-wrap py-8 gap-y-4 justify-center">
        {[...data].reverse().map((product) => (
          <div key={product._id} className="sm:1/2 md:1/3 lg:1/4 xl:w-1/6 p-2">
            <ProductCard
              product={product}
              isInWishlist={wishlist.includes(product._id)}
              onWishlistChange={handleWishlistChange}
              userToken={userToken}
            />
          </div>
        ))}
      </div>
    </>
  );
}
