import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const emailFromState = location.state?.email || '';

  const [email, setEmail] = useState(emailFromState);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailFromState) setEmail(emailFromState);
  }, [emailFromState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email,
        newPassword: password
      });
      setMessage('Password reset successful. You can now log in.');
      toast.success('Password reset successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password.');
      toast.error(err.response?.data?.message || 'Error resetting password.');
    }
    setLoading(false);
  };

  return (
    <div className="md:w-1/2 mx-auto mt-8">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
          required
          disabled={!!emailFromState}
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {message && <div className="text-green-500 mb-2">{message}</div>}
        <button type="submit" className="bg-main text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
} 