import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    async function fetchBrands() {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    }
    fetchBrands();
  }, []);

  return (
    
    <div className='p-6'>
      <h2 className='mb-4'>Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map(brand => (
          <Link to={`/products/brand/${brand._id}`} key={brand._id} className="border p-2 rounded block text-center">
            <img src={brand.image} alt={brand.name} className="w-full h-32 object-cover mb-2" />
            <h3>{brand.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
