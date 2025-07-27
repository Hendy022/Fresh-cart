import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductSearchFilter({ onResults }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFilters() {
      const catRes = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(catRes.data.data);
      const brandRes = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(brandRes.data.data);
    }
    fetchFilters();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = `https://ecommerce.routemisr.com/api/v1/products?`;
    if (search) url += `keyword=${search}&`;
    if (category) url += `category=${category}&`;
    if (brand) url += `brand=${brand}&`;
    const { data } = await axios.get(url);
    onResults(data.data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 pt-4 flex flex-wrap gap-2">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="ps-3 border rounded"
      />
      <select value={category} onChange={e => setCategory(e.target.value)} className="ps-3 border rounded">
        <option value="">All Categories</option>
        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
      </select>
      <select value={brand} onChange={e => setBrand(e.target.value)} className="ps-3 border rounded">
        <option value="">All Brands</option>
        {brands.map(brand => <option key={brand._id} value={brand._id}>{brand.name}</option>)}
      </select>
      <button type="submit" className="bg-main text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
} 