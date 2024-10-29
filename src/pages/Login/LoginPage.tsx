import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginModal from './components/Modal'; // Cambié FitFriendsModal por LoginModal para que coincida con tu componente

const LoginPage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ubicación actual

  const from = location.state?.from; // Si no hay una ruta previa, redirige al home

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(from); // Redirige a la página anterior al cerrar el modal
  }
  return (
    <div>
      <LoginModal />
    </div>
  );
};

export default LoginPage;
