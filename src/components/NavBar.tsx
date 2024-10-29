import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { jwtDecode } from 'jwt-decode';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface NavbarComponentProps {
  onAboutUsClick: () => void;
  onPlansClick: () => void;
  isDashboard?: boolean;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({ onPlansClick, onAboutUsClick, isDashboard }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    AOS.init({ duration: 300, once: true });
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    navigate('/');
  };

  const isAuthenticated = !!localStorage.getItem('token');
  const nombre = localStorage.getItem('nombre') || '';
  const apellido = localStorage.getItem('apellido') || '';

  let avatarUrl = '';

  if (isAuthenticated) {
    const token = localStorage.getItem('token');
    if (token && token.split('.').length === 3) {
      try {
        const decoded: any = jwtDecode(token);
        avatarUrl = decoded.avatarUrl || '';
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        handleLogoutClick();
      }
    } else {
      handleLogoutClick();
    }
  }

  const openDropdown = () => {
    if (closeDropdownTimeout.current) {
      clearTimeout(closeDropdownTimeout.current);
    }
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    closeDropdownTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  return (
    <nav className='rounded-2xl fixed bg-[#fafafa] backdrop-blur-sm mt-[1rem] ml-[10%] w-[80%] py-4 px-6 shadow-md z-50'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img src={logo} alt="Logo" className='h-10 mr-4' />
          <span className='text-xl text-[#001f3f] font-bold'>
            Falta <strong>Uno</strong>
          </span>
        </div>

        {isDashboard && (
          <div className='flex space-x-4 mr-4'>
            <Link
              to="/createEvent"
              className="bg-customGreen text-white px-4 py-2 mx-3 rounded-lg shadow-lg transition-colors duration-300 ease-in-out hover:bg-customBlue"
            >
              Crear Evento
            </Link>
            <Link
              to="/"
              className="bg-customGreen text-white px-4 py-2 mx-0 rounded-lg shadow-lg transition-colors duration-300 ease-in-out hover:bg-customBlue"
            >
              Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="bg-customGreen text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-300 ease-in-out hover:bg-customBlue"
            >
              Volver
            </button>
          </div>
        )}

        <div className='flex-grow flex items-center mt-1 ml-[2rem] space-x-5'>
          {!isDashboard && (
            <>
              <a onClick={onAboutUsClick} className='relative text-black no-underline pb-1 transition-colors duration-300 hover:text-[#221784] cursor-pointer'>
                Sobre Nosotros
              </a>
              <a onClick={onPlansClick} className='relative text-black no-underline pb-1 transition-colors duration-300 hover:text-[#221784] cursor-pointer'>
                Ver Planes
              </a>
            </>
          )}
        </div>

        {isAuthenticated ? (
          <div
            className='relative flex items-center space-x-4 cursor-pointer'
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <span className='text-black font-bold'>{`${nombre} ${apellido}`}</span>
            <img src={avatarUrl || ''} alt="Avatar" className='h-12 w-12 rounded-full' />

            {isDropdownOpen && (
              <div
                data-aos="fade-down"
                className='absolute top-full left-0 mt-4 -ml-6 w-48 bg-[#fafafa] rounded-lg shadow-lg border border-gray-200 py-2'
              >
                <Link to="/profile" className='block px-4 py-2 text-center text-black hover:bg-gray-100 hover:rounded-md transition duration-150'>
                  Perfil
                </Link>
                <Link to="/dashboard" className='block px-4 py-2 text-center text-black hover:bg-gray-100 hover:rounded-md transition duration-150'>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className='w-full text-center px-4 py-2 text-black hover:bg-gray-100 hover:rounded-md transition duration-150'
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className='w-[140px] border-2 border-black rounded-md bg-transparent px-3 py-2 text-center text-l mr-4 font-semibold text-black shadow-sm hover:bg-blue-900'>
              Ingresar
            </Link>
            <Link to="/register" className='w-[140px] border-2 rounded-md bg-[#001f3f] px-3 py-2 text-center text-l font-semibold text-white shadow-md hover:bg-blue-900'>
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
