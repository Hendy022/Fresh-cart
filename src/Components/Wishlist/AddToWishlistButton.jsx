import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';

export default function AddToWishlistButton({ productId, isInWishlist, onChange }) {
  const { userToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setAnimate(true);
    try {
      if (isInWishlist) {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
          headers: { token: userToken }
        });
        toast.info('Removed from wishlist');
      } else {
        await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, {
          headers: { token: userToken }
        });
        toast.success('Added to wishlist!');
      }
      onChange && onChange();
    } catch (err) {
      toast.error('Wishlist action failed');
    }
    setTimeout(() => setAnimate(false), 300);
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      className={`transition-transform duration-200 ${animate ? 'scale-125' : ''}`}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      {isInWishlist ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="#e53e3e" viewBox="0 0 24 24" width="28" height="28">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#e53e3e" strokeWidth="2" viewBox="0 0 24 24" width="28" height="28">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );
} 