import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import ProductCard from '../Products/ProductCard';
import Loading from '../Loading/Loading';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    async function fetchWishlist() {
      setLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: userToken }
      });
      setWishlist(data.data);
      setLoading(false);
    }
    fetchWishlist();
  }, [userToken]);

  const handleWishlistChange = async () => {
    if (userToken) {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: userToken }
      });
      setWishlist(data.data);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2>My Wishlist</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            isInWishlist={true}
            onWishlistChange={handleWishlistChange}
            userToken={userToken}
          />
        ))}
      </div>
    </div>
  );
} 