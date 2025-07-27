import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { UserContext } from '../../context/UserContext';
import Loading from '../Loading/Loading';

export default function ProductsByCategory() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
      setProducts(data.data);
      setLoading(false);
    }
    async function fetchWishlist() {
      if (userToken) {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers: { token: userToken }
        });
        setWishlist(data.data.map(item => item._id));
      }
    }
    fetchProducts();
    fetchWishlist();
  }, [categoryId, userToken]);

  const handleWishlistChange = async () => {
    if (userToken) {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: userToken }
      });
      setWishlist(data.data.map(item => item._id));
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2>Products by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            isInWishlist={wishlist.includes(product._id)}
            onWishlistChange={handleWishlistChange}
            userToken={userToken}
          />
        ))}
      </div>
    </div>
  );
} 