import React from 'react';
import './styles/custom.css';

import cat1 from '../assets/cat1.png';
/*import cat2 from '../assets/cat2.png';
import cat3 from '../assets/cat3.png';
import cat4 from '../assets/cat4.png';
import cat5 from '../assets/cat5.png';
import cat6 from '../assets/cat6.png';
import cat7 from '../assets/cat7.png';*/

const categories = [
  { name: 'Baloncesto', img: cat1, link: '#Baloncesto' },
  /*{ name: 'Categoría 2', img: cat2, link: '#Basket' },
  { name: 'Categoría 3', img: cat3, link: '#Padel' },
  { name: 'Categoría 4', img: cat4, link: '#Tennis' },
  { name: 'Categoría 5', img: cat5, link: '#Ciclismo' },
  { name: 'Categoría 6', img: cat6, link: '#PingPong' },
  { name: 'Categoría 7', img: cat7, link: '#Otros' },*/
];

const CategoriesComponent: React.FC = () => {
  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <a key={index} href={category.link} className="category">
          <img src={category.img} alt={category.name} />
          <div>{category.name}</div>
        </a>
      ))}
    </div>
  );
};

export default CategoriesComponent;