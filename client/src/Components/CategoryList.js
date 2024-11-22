// CategoryList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Gym Equipment', image: 'https://media.istockphoto.com/id/1391410249/photo/sports-and-gym-activities.jpg?s=612x612&w=0&k=20&c=1S-hAmT-CkRtdYV_hcKi1lZdQkXAN_mCy3ebIXlUEnE=' },
  { name: 'Supplements', image: 'https://this.deakin.edu.au/wp-content/uploads/2023/03/iStock-1365347765.jpg' },
  { name: 'Accessories', image: 'https://static2.bigstockphoto.com/1/9/2/large1500/291349417.jpg' },
];

const CategoryList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category, index) => (
       <Link to={'/ProductPage'}> <div
          key={index}
          className="relative w-full h-48 rounded-lg shadow-lg overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold">{category.name}</h3>
          </div>
        </div> </Link>
      ))}
    </div>
  );
};

export default CategoryList;
