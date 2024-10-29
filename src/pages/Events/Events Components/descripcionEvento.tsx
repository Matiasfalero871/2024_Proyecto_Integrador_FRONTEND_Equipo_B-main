import React, { useEffect } from 'react';
import { Evento } from './CatEventos'; // Asegúrate de que la ruta sea correcta

// Importar imágenes
import futbolImage from '../../../assets/Categorias/futbolImage.png';
import basketballImage from '../../../assets/Categorias/basketImage.png';
import tenisImage from '../../../assets/Categorias/tenisImage.png';
import defaultImage from '../../../assets/Categorias/defaultImage.png';
import padelImage from '../../../assets/Categorias/padelImage.png';
import hokeyImage from '../../../assets/Categorias/hokeyImage.png';

interface ModalProps {
  evento: Evento;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ evento, onClose }) => {
  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Formatear la fecha
  const formatDate = (fecha: string) => {
    const date = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Función para obtener la URL de la imagen según el deporte
  const getDeporteImage = (deporte: string) => {
    switch (deporte.toLowerCase()) {
      case 'futbol':
        return futbolImage;
      case 'basquetbol':
        return basketballImage;
      case 'tennis':
        return tenisImage;
      case 'padel':
        return padelImage;
      case 'hokey':
        return hokeyImage;
      case 'otro':
        return defaultImage; // Imagen por defecto
    }
  };

  return (
    <div 
      className="fixed inset-0 modal-overlay bg-black bg-opacity-50 flex justify-center items-center z-50" 
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg relative">
        <span 
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-900" 
          onClick={onClose}
          role="button"
          aria-label="Close modal"
        >
          &times;
        </span>
        
        {/* Imagen del evento según el deporte */}
        <div className="relative w-full mb-4" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <img 
            src={getDeporteImage(evento.deporte)} 
            alt={`Imagen de ${evento.deporte}`} 
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
  
        <h2 className="text-2xl font-bold mb-4">{evento.nombre}</h2>
        <p className="text-lg">Deporte: {evento.deporte}</p>
        <p className="text-lg">Participantes: {evento.lim_participantes}</p>
        <p className="text-lg">Edad máxima: {evento.lim_edad}</p>
        <p className="text-lg">Fecha: {formatDate(evento.fecha)}</p>
  
        {/* Nuevos campos */}
        {evento.descripcion && (
          <p className="text-lg mt-4">Descripción: {evento.descripcion}</p>
        )}
        {evento.costo !== undefined && (
          <p className="text-lg">Costo: ${evento.costo.toFixed(2)}</p>
        )}
        
        {/* Mostrar nombre y apellido del usuario */}
        <p className="text-lg">Creador: {evento.usuario.nombre} {evento.usuario.apellido}</p>
      </div>
    </div>
  );
};

export default Modal;
