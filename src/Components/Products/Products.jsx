import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductSearchFilter from './ProductSearchFilter';
import ProductCard from './ProductCard';
import { UserContext } from '../../context/UserContext';
import Loading from '../Loading/Loading';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
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
  }, [userToken]);

  const handleSearchResults = (results) => {
    setProducts(results);
  };

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
      <ProductSearchFilter onResults={handleSearchResults} />
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
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
