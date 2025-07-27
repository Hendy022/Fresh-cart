import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

export default function AddToCartButton({ productId, onAdd }) {
  const { addProductToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      await addProductToCart(productId);
      onAdd && onAdd();
      toast.success('Added to cart!');
    } catch (err) {
      toast.error('Failed to add to cart');
    }
    setLoading(false);
  };

  return (
    <div className="inline-block">
      <button
        onClick={handleAdd}
        disabled={loading}
        className="bg-main text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
        aria-label="Add to Cart"
      >
        {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-cart-plus"></i>}
      </button>
    </div>
  );
} 