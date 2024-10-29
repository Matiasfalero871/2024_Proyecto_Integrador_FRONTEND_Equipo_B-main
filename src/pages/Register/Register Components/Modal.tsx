import React, { useState, useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Corredor from '../../../assets/CorredorXD.png'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import spinner from '../../../assets/spinner.png'; // Imagen del spinner

const RegisterPage: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [ci, setCedula] = useState<string>('');
  const [fecha_nac, setBirthdate] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [sexo, setSexo] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado para mostrar el spinner
  const [loadingMessage, setLoadingMessage] = useState<string>(''); // Mensaje de carga
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSexo(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(event.target.value);
  };

  const handleCedulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCedula(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nombre || !apellido || !ci || !fecha_nac || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const ciNumber = parseInt(ci, 10);
    const sexoFormatted = sexo === 'hombre' ? 'M' : sexo === 'mujer' ? 'F' : 'O';

    setLoading(true);
    setLoadingMessage('Se están guardando los datos...');

    const messages = [
      'Se están cargando su nombre y apellido...',
      'Se está cargando su perfil...',
      'Por favor, espere mientras se procesan los datos...',
      'Estamos finalizando su registro...',
    ];

    let messageIndex = 0;

    // Cambiar el mensaje cada 4 segundos
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setLoadingMessage(messages[messageIndex]);
        messageIndex++;
      }
    }, 4000);

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ci: ciNumber,
          nombre,
          apellido,
          fecha_nac: new Date(fecha_nac).toISOString(),
          password,
          correo,
          sexo: sexoFormatted,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la cuenta');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Guardar el token
      localStorage.setItem('nombre', data.nombre); // Guardar el nombre
      localStorage.setItem('apellido', data.apellido); // Guardar el apellido

      // Esperar 15 segundos antes de redirigir
      await new Promise((resolve) => setTimeout(resolve, 15000)); 

      navigate('/'); // Redirigir a la página principal
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      clearInterval(messageInterval); // Limpiar el intervalo
      setLoading(false); // Ocultar spinner
    }
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

      <div className="flex-1 bg-white flex items-center justify-center p-12 relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate(-1)}
            className="text-black hover:underline"
          >
            Volver
          </button>
        </div>
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-bold text-center mb-8" data-aos="fade-down">Registrarse</h1>
          {loading ? (
            <div className="flex flex-col items-center">
              <img src={spinner} alt="Cargando..." className="h-16 w-16 animate-spin" />
              <p className="mt-4 text-center">{loadingMessage}</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit} data-aos="fade-down">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-full focus:outline-none"
                style={{ borderColor: '#001f3f' }}
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-full focus:outline-none"
                style={{ borderColor: '#001f3f' }}
                required
              />
              <input
                type="text"
                placeholder="Cédula"
                value={ci}
                onChange={handleCedulaChange}
                className="w-full px-4 py-2 border-2 rounded-full focus:outline-none"
                style={{ borderColor: '#001f3f' }}
                required
              />
              <input
                type="date"
                placeholder="Fecha de Nacimiento"
                value={fecha_nac}
                onChange={handleDateChange}
                className="w-full px-4 py-2 border-2 rounded-full focus:outline-none"
                style={{ borderColor: '#001f3f' }}
                required
              />
              <div className="flex space-x-2">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-1/2 px-4 py-2 border-2 rounded-full focus:outline-none"
                  style={{ borderColor: '#001f3f' }}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-1/2 px-4 py-2 border-2 rounded-full focus:outline-none"
                  style={{ borderColor: '#001f3f' }}
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Correo (Opcional)"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-full focus:outline-none"
                style={{ borderColor: '#001f3f' }}
              />
              <div className="flex space-x-4 justify-center">
                <label>
                  <input
                    type="radio"
                    value="hombre"
                    checked={sexo === 'hombre'}
                    onChange={handleGenderChange}
                    className="form-radio"
                    style={{ color: '#001f3f' }}
                  />
                  <span className="ml-2">Masculino</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="mujer"
                    checked={sexo === 'mujer'}
                    onChange={handleGenderChange}
                    className="form-radio"
                    style={{ color: '#001f3f' }}
                  />
                  <span className="ml-2">Femenino</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="otro"
                    checked={sexo === 'otro'}
                    onChange={handleGenderChange}
                    className="form-radio"
                    style={{ color: '#001f3f' }}
                  />
                  <span className="ml-2">Otro</span>
                </label>
              </div>
              {error && <div className="text-red-500 text-center">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 bg-[#001f3f] text-white rounded-full hover:bg-blue-800 focus:outline-none"
              >
                Registrarse
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
