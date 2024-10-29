import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import spinner from '../../../assets/spinner.png'; // Imagen del spinner
import Corredor from '../../../assets/CorredorXD.png'; // Asegúrate de que la ruta sea correcta

const LoginPage: React.FC = () => {
  const [ci, setCedula] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/'; // Ruta anterior

  useEffect(() => {
    AOS.init();
  }, []);

  const handleCedulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCedula(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!ci || !password) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Convertir ci a número
    const ciNumber = parseInt(ci, 10);

    // Mostrar spinner y deshabilitar el formulario
    setLoading(true);

    // Simula una espera de 3 segundos antes de enviar la solicitud
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ci: ciNumber,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('apellido', data.apellido);

        setLoading(false);
        navigate(from); // Redirige a la página anterior automáticamente
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        setError(errorMessage);
        setLoading(false); // Ocultar spinner en caso de error
      }
    }, 3000); // 3 segundos de espera
  };

  return (
    <div className="flex h-screen bg-[#001f3f]">
      <div className="flex-1 flex items-center justify-center bg-[#001f3f]">
        <img
          src={Corredor}
          alt="Corredor"
          className="h-80"
          data-aos="fade-right"
        />
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-12">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate(-1)} // Redirige a la página anterior
            className="text-black hover:underline"
          >
            Volver
          </button>
        </div>
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-bold text-center mb-8" data-aos="fade-down">Iniciar sesión</h1>
          {loading ? (
            <div className="flex justify-center">
              {/* Mostrar el spinner mientras carga */}
              <img src={spinner} alt="Cargando..." className="h-16 w-16 animate-spin" />
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit} data-aos="fade-down">
              <input
                type="text"
                placeholder="Cédula"
                value={ci}
                onChange={handleCedulaChange}
                maxLength={8}
                className="w-full px-4 py-2 border-2 border-blue-900 rounded-full focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-blue-900 rounded-full focus:outline-none"
                required
              />
              {error && <div className="text-red-500 text-center">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 bg-[#001f3f] text-white rounded-full hover:bg-blue-800 focus:outline-none"
                disabled={loading} // Deshabilitar el botón si está cargando
              >
                Iniciar Sesión
              </button>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => navigate('/register')} // Redirige a la página de registro
                  className="text-blue-500 hover:underline"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
