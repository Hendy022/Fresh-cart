import React from 'react';
import AddToCartButton from './AddToCartButton';
import AddToWishlistButton from '../Wishlist/AddToWishlistButton';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, isInWishlist, onWishlistChange, userToken }) {
  if (!product) return <div>Loading...</div>;
  return <>
    <div className="border p-2 dark:bg-gray-800  bg-white shadow rounded flex flex-col items-center">

      <Link to={`/productdetails/${product.id}`}>
        <img src={product.imageCover} alt={product.title} className="w-full  object-cover mb-2 rounded" />
        <h3 className="font-semibold text-center mb-1 line-clamp-1">{product.title}</h3>
        <p className="mb-2 text-main font-bold text-center">{product.price} EGP</p>
      </Link>
      <div className="flex gap-2 items-center">
        {userToken && (
          <AddToWishlistButton
            productId={product._id}
            isInWishlist={isInWishlist}
            onChange={onWishlistChange}
          />
        )}
        <AddToCartButton productId={product._id} />
      </div>
    </div >
  </>

} 