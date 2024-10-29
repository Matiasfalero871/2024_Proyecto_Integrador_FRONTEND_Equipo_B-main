import React from 'react';
import '../styles/Titulo.css'; // Asegúrate de importar tu archivo CSS
import Logo from '../assets/logo.png'; // Importa la imagen aquí

const Titulo: React.FC = () => {
  return (
    <div className="titulo-container">
      <img src={Logo} alt="Imagen Título" className="titulo-imagen" />
      <span className="titulo-texto">Fit <strong>Friends</strong></span>
    </div>
  );
};

export default Titulo;
