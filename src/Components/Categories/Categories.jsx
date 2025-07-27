import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(category => (
          <Link to={`/products/category/${category._id}`} key={category._id} className="border p-2 rounded block text-center">
            <img src={category.image} alt={category.name} className="w-full h-32 object-cover mb-2" />
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
