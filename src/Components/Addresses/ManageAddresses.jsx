import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';

export default function ManageAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ details: '', city: '', phone: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    async function fetchAddresses() {
      setLoading(true);
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/addresses', {
          headers: { token: userToken }
        });
        setAddresses(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load addresses');
        setLoading(false);
      }
    }
    fetchAddresses();
  }, [userToken]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      if (editId) {
        await axios.put(`https://ecommerce.routemisr.com/api/v1/addresses/${editId}`, form, {
          headers: { token: userToken }
        });
        setMessage('Address updated successfully');
        toast.success('Address updated successfully');
      } else {
        await axios.post('https://ecommerce.routemisr.com/api/v1/addresses', form, {
          headers: { token: userToken }
        });
        setMessage('Address added successfully');
        toast.success('Address added successfully');
      }
      setForm({ details: '', city: '', phone: '' });
      setEditId(null);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/addresses', {
        headers: { token: userToken }
      });
      setAddresses(data.data);
    } catch (err) {
      setError('Failed to save address');
      toast.error('Failed to save address');
    }
    setSaving(false);
  };

  const handleEdit = address => {
    setForm({ details: address.details, city: address.city, phone: address.phone });
    setEditId(address._id);
  };

  const handleDelete = async id => {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        headers: { token: userToken }
      });
      setAddresses(addresses.filter(addr => addr._id !== id));
      setMessage('Address deleted successfully');
      toast.info('Address deleted successfully');
    } catch (err) {
      setError('Failed to delete address');
      toast.error('Failed to delete address');
    }
    setSaving(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="md:w-1/2 mx-auto p-5 mt-8">
      <h2 className='mb-4'>Manage Addresses</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {message && <div className="text-green-500 mb-2">{message}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <input name="details" value={form.details} onChange={handleChange} placeholder="Details" className="block w-full mb-2 p-2 border rounded" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="block w-full mb-2 p-2 border rounded" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="block w-full mb-2 p-2 border rounded" required />
        <button type="submit" className="bg-main text-white px-4 py-2 rounded" disabled={saving}>{editId ? 'Update' : 'Add'} Address</button>
      </form>
      <ul>
        {addresses.map(addr => (
          <li key={addr._id} className="mb-2 border p-2 rounded flex justify-between items-center">
            <span>{addr.details}, {addr.city}, {addr.phone}</span>
            <span>
              <button onClick={() => handleEdit(addr)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(addr._id)} className="bg-red-500 text-white px-2 py-1 rounded" disabled={saving}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
} 