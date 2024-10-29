import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CorredorXd from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [showAvatars, setShowAvatars] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    sexo: '',
    avatarUrl: ''
  });

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/avatars');
        setAvatars(Array.isArray(response.data) ? response.data : response.data.avatars);
      } catch (error) {
        console.error('Error cargando los avatares:', error);
      }
    };
    fetchAvatars();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const response = await axios.get(`http://localhost:3000/api/users/${decoded.ci}`);
        const newDecoded = response.data;
        setFormData({
          nombre: newDecoded.nombre,
          apellido: newDecoded.apellido,
          correo: newDecoded.correo,
          sexo: newDecoded.sexo,
          avatarUrl: newDecoded.avatarUrl,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isUpdated]); 

  const handleAvatarClick = (url: string) => {
    setFormData({ ...formData, avatarUrl: url });
    setShowAvatars(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No hay token disponible');
        return;
      }
      const decoded: any = jwtDecode(token);
      const ci = decoded.ci;
  
      const response = await axios.put(`http://localhost:3000/api/users/${ci}`, formData);
  
      // Verifica que el token esté presente en la respuesta
      const newToken = response.data.token;
      if (newToken) {
        // Aquí puedes guardar el nuevo token en localStorage si lo deseas
        localStorage.setItem('token', newToken);
        console.log('Token actualizado:', newToken);
      } else {
        console.error('No se recibió un nuevo token en la respuesta');
      }
  
      // Cierra sesión al borrar el token y redirige al login
      localStorage.removeItem('token'); // Borra el token de localStorage
      navigate('/login'); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error('Error actualizando perfil:', error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdateProfile();
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex h-screen items-center bg-gray-50">
      <div className="w-1/2 mb-[5rem] p-8">
        <div className="flex items-center justify-center mb-12">
          <img src={CorredorXd} alt="Logo" className="w-20 mr-4" />
          <h1 className="text-4xl font-bold">Editar Perfil</h1>
        </div>
        <form className="space-y-7 ml-32" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="w-1/2 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="w-1/2 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.apellido}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.correo}
            onChange={handleInputChange}
          />
          <div className="flex space-x-4">
            <select
              name="sexo"
              className="w-1/2 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.sexo}
              onChange={handleInputChange}
            >
              <option value="">Selecciona tu género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
            <button type="submit" className="w-1/2 p-3 bg-black text-white rounded hover:bg-gray-800 transition">
              Listo
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center">
        {!showAvatars ? (
          <button onClick={() => setShowAvatars(true)} className="relative">
            <div className={`w-80 h-80 bg-gray-300 rounded-full flex items-center justify-center shadow-md animate-bounce`}>
              {formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="Avatar seleccionado" className="w-full h-full rounded-full" />
              ) : (
                <svg className="h-52 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index}`}
                className="cursor-pointer w-24 h-24 rounded-full border-2 border-transparent hover:border-blue-500 transition"
                onClick={() => handleAvatarClick(avatar)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
