import React from 'react';
import '../../../styles/FooterBackground.css';
import diseño from '../../../assets/diseñoBottom.png'

const FooterBackground: React.FC = () => {
  return (  
    <div className="Primera-Fondo">
      <img src= {diseño} alt="Mountains" />
    </div>
  );
};

export default FooterBackground;
