import React, { useState, useEffect } from 'react';
import RegisterModal from './Register Components/Modal';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/');
  };

  return (
    <div>
      <RegisterModal />
    </div>
  );
};

export default RegisterPage;
