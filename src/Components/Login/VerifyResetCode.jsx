import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function VerifyResetCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!code) {
      setError('Please enter the code sent to your email.');
      toast.error('Please enter the code sent to your email.');
      setLoading(false);
      return;
    }
    toast.success('Code verified!');
    // Navigate to ResetPassword with email and code as query params
    navigate(`/reset-password?token=${code}`, { state: { email } });
    setLoading(false);
  };

  return (
    <div className="md:w-1/2 mx-auto mt-8">
      <h2>Verify Reset Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the code sent to your email"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="bg-main text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify Code'}
        </button>
      </form>
    </div>
  );
} 