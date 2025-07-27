import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      setMessage('Check your email for the reset link.');
      toast.success('Check your email for the reset link.');
      setTimeout(() => navigate('/verify-reset-code', { state: { email } }), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending reset email.');
      toast.error(err.response?.data?.message || 'Error sending reset email.');
    }
    setLoading(false);
  };

  return (
    <div className="md:w-1/2 mx-auto mt-8">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {message && <div className="text-green-500 mb-2">{message}</div>}
        <button type="submit" className="bg-main text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
} 