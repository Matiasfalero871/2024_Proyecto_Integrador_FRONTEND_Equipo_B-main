import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CorredorXD from '../../../assets/CorredorXD.png';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import spinner from '../../../assets/spinner.png'; // Asegúrate de tener la imagen del spinner

const CreateEvent: React.FC = () => {
  
  const navigate = useNavigate(); // Hook para redireccionar
  const [loading, setLoading] = useState<boolean>(false); // Estado para mostrar el spinner
  const [loadingMessage, setLoadingMessage] = useState<string>(''); // Mensaje de carga
  const [formData, setFormData] = useState({
    nombre: '',
    lim_participantes: '',
    lim_edad: '',
    deporte: '',
    fecha: '',
    descripcion: '',
    costo: '',
    usuarioId: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    fecha: '',
    deporte: '',
    usuarioId: '',
  });

  const deportes = ['Futbol', 'Basquetbol', 'Padel', 'Tennis', 'Hokey', 'Otro'];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Limpiar errores al escribir
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campos obligatorios
    const newErrors = {
      nombre: formData.nombre === '' ? 'El nombre es obligatorio' : '',
      fecha: formData.fecha === '' ? 'La fecha es obligatoria' : '',
      deporte: formData.deporte === '' ? 'Debes seleccionar un deporte' : '',
      usuarioId: formData.usuarioId === '' ? 'La cédula es obligatoria' : '',
    };

    setErrors(newErrors);

    // Si hay errores, no envíes el formulario
    if (Object.values(newErrors).some((error) => error !== '')) return;

    const participantes = formData.lim_participantes || 'No hay límite de participantes';
    const edad = formData.lim_edad || 'Edad libre';
    const costo = formData.costo ? parseFloat(formData.costo) : 0;

    setLoading(true); // Iniciar el estado de carga
    setLoadingMessage('Preparando el evento...');

    const messages = [
      'Asignando deportes...',
      'Confirmando los participantes...',
      'Organizando los detalles del evento...',
      'Estamos casi listos...',
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setLoadingMessage(messages[messageIndex]);
        messageIndex++;
      }
    }, 2500); // Cambiar mensajes cada 2.5 segundos

    try {
      const response = await fetch('http://localhost:3000/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lim_participantes: participantes,
          lim_edad: edad,
          costo: costo,
          fecha: new Date(formData.fecha).toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Error al crear el evento');

      // Simular tiempo de espera de 10 segundos
      await new Promise((resolve) => setTimeout(resolve, 10000));

      clearInterval(messageInterval); // Limpiar el intervalo de mensajes
      setLoading(false); // Detener el spinner

      navigate(-1); // Redirigir a la página anterior
    } catch (error) {
      console.error('Error al crear el evento:', error);
      clearInterval(messageInterval);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sección izquierda */}
      <div className="flex-1 flex items-center justify-center bg-[#001f3f]">
        <img src={CorredorXD} alt="Runner" className="h-80" />
      </div>        
      <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate(-1)} // Redirige a la página anterior
            className="text-black hover:underline"
          >
            Volver
          </button>
        </div>

      {/* Sección derecha con el formulario */}
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-8 text-center">Crea tu evento</h2>

        {loading ? (
          <div className="flex flex-col items-center">
            <img src={spinner} alt="Cargando..." className="h-16 w-16 animate-spin" />
            <p className="mt-4 text-center">{loadingMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div className="flex flex-col">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="border-2 border-blue-900 rounded-full p-3 w-full text-center font-semibold"
              />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
            </div>

            {/* Lim Participantes y Lim Edad */}
            <div className="flex space-x-4">
              <input
                type="number"
                name="lim_participantes"
                value={formData.lim_participantes}
                onChange={handleChange}
                placeholder="Lim Participantes"
                className="border-2 border-blue-900 rounded-full p-3 w-1/2 text-center font-semibold"
              />
              <input
                type="number"
                name="lim_edad"
                value={formData.lim_edad}
                onChange={handleChange}
                placeholder="Límite de Edad"
                className="border-2 border-blue-900 rounded-full p-3 w-1/2 text-center font-semibold"
              />
            </div>

            {/* Fecha */}
            <div className="flex flex-col">
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="border-2 border-blue-900 rounded-full p-3 w-full text-center font-semibold"
              />
              {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha}</p>}
            </div>

            {/* Deporte */}
            <div className="flex flex-col">
              <select
                name="deporte"
                value={formData.deporte}
                onChange={handleChange}
                className="border-2 border-blue-900 rounded-full p-3 w-full text-center font-semibold"
              >
                <option value="">Selecciona un deporte</option>
                {deportes.map((deporte) => (
                  <option key={deporte} value={deporte}>
                    {deporte}
                  </option>
                ))}
              </select>
              {errors.deporte && <p className="text-red-500 text-sm">{errors.deporte}</p>}
            </div>

            {/* Costo */}
            <div className="flex">
              <input
                type="number"
                name="costo"
                value={formData.costo}
                onChange={handleChange}
                placeholder="Costo"
                className="border-2 border-blue-900 rounded-full p-3 w-full text-center font-semibold"
              />
            </div>

            {/* Cédula con ícono de información */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="usuarioId"
                value={formData.usuarioId}
                onChange={handleChange}
                placeholder="Cédula"
                className="border-2 border-blue-900 rounded-full p-3 w-full text-center font-semibold"
              />
              <AiOutlineInfoCircle
                title="Aquí debes ingresar tu cédula con la que estás registrado"
                className="text-blue-900 cursor-pointer"
                size={24}
              />
            </div>
            {errors.usuarioId && <p className="text-red-500 text-sm">{errors.usuarioId}</p>}

            {/* Descripción */}
            <div className="flex">
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                rows={3}
                className="border-2 border-blue-900 rounded-full p-3 w-full text-center font-semibold"
              />
            </div>

            {/* Botón de Crear */}
            <button
              type="submit"
              className="w-full bg-[#001f3f] text-white rounded-full p-3 font-bold hover:bg-blue-900 transition"
            >
              Crear Evento
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
