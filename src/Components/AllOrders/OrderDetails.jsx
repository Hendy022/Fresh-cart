import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Loading from '../Loading/Loading';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { userToken } = useContext(UserContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/${orderId}`, {
          headers: { token: userToken }
        });
        setOrder(data.data);
      } catch (err) {
        setError('Failed to load order details');
      }
      setLoading(false);
    }
    fetchOrder();
  }, [orderId, userToken]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 mb-2">{error}</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div className="md:w-1/2 mx-auto mt-8">
      <h2>Order Details</h2>
      <p><b>Order ID:</b> {order._id}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Total:</b> {order.totalOrderPrice} EGP</p>
      <h3>Products:</h3>
      <ul>
        {order.cartItems.map(item => (
          <li key={item._id} className="mb-2">
            {item.product.title} - {item.count} x {item.price} EGP
          </li>
        ))}
      </ul>
    </div>
  );
} 