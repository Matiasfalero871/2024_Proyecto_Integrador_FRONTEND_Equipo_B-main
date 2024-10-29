import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComponent from '../../components/NavBar';
import Modal from '../Events/Events Components/descripcionEvento'; // Asegúrate de que la ruta sea correcta
import { Evento } from '../../pages/Events/Events Components/CatEventos'; // Asegúrate de que la ruta sea correcta

const Dashboard: React.FC = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null); // Para el evento seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la apertura del modal

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get<Evento[]>('http://localhost:3000/api/events');
                setEventos(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los eventos');
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    const handleOpenModal = (evento: Evento) => {
        setSelectedEvento(evento);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvento(null);
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex min-h-screen bg-white">
            {/* Barra de navegación superior */}
            <NavbarComponent
                onAboutUsClick={() => console.log("About Us Clicked")}
                onPlansClick={() => console.log("Plans Clicked")}
                isDashboard={true}
            />

            <main className="flex-1 ml-32 p-14">
                <div className="mt-16">
                    <h1 className="text-3xl font-bold mb-6">Eventos</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {eventos.map((evento) => (
                            <div
                                key={evento.id_evento}
                                className="rounded-lg overflow-hidden shadow-md bg-gray-100 p-4 flex flex-col justify-between"
                            >
                                <h3 className="text-lg font-semibold">{evento.nombre}</h3>
                                <p className="text-sm text-gray-600">
                                    {evento.lim_participantes > 0 
                                        ? `${evento.lim_participantes} Participantes faltantes` 
                                        : 'Sin límite de participantes'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {evento.lim_edad > 0 
                                        ? `Edad máxima: ${evento.lim_edad} años` 
                                        : 'Sin límite de edad'}
                                </p>
                                <div className="mt-4">
                                    <button 
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleOpenModal(evento)} // Abre el modal con el evento seleccionado
                                    >
                                        Unirme
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal para mostrar la descripción del evento */}
                {isModalOpen && selectedEvento && (
                    <Modal 
                        evento={selectedEvento}
                        onClose={handleCloseModal}
                    />
                )}
            </main>
        </div>
    );
};

export default Dashboard;
