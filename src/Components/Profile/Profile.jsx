import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/users/getMe', {
          headers: { token: userToken }
        });
        setProfile(data.data);
        setForm({ name: data.data.name, email: data.data.email });
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile');
        setLoading(false);
      }
    }
    fetchProfile();
  }, [userToken]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);
    try {
      const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe', form, {
        headers: { token: userToken }
      });
      setMessage('Profile updated successfully');
      toast.success('Profile updated successfully');
      setEdit(false);
      setProfile(data.data);
    } catch (err) {
      setError('Failed to update profile');
      toast.error('Failed to update profile');
    }
    setSaving(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="md:w-1/2 pt-5 space-y-4 space-x-4 mx-auto mt-8">
      <h2>User Profile</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {message && <div className="text-green-500 mb-2">{message}</div>}
      {edit ? (
        <form onSubmit={handleUpdate}>
          <input name="name" value={form.name} onChange={handleChange} className="block w-full mb-4 p-2 border rounded" />
          <input name="email" value={form.email} onChange={handleChange} className="block w-full mb-4 p-2 border rounded" />
          <button type="submit" className="bg-main text-white px-3 py-2 rounded" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => setEdit(false)} className="ml-2 px-4 py-2 rounded border">Cancel</button>
        </form>
      ) : (
        <div>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
          <button onClick={() => setEdit(true)} className="bg-main text-white px-4 py-2 rounded mt-2">Edit</button>
        </div>
      )}
    </div>
  );
} 