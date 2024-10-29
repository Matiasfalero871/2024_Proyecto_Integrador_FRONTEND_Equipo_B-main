import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './descripcionEvento';

// Importar imágenes
import futbolImage from '../../../assets/Categorias/futbolImage.png';
import basketballImage from '../../../assets/Categorias/basketImage.png';
import tenisImage from '../../../assets/Categorias/tenisImage.png';
import padelImage from '../../../assets/Categorias/padelImage.png';
import hokeyImage from '../../../assets/Categorias/hokeyImage.png';
import defaultImage from '../../../assets/Categorias/defaultImage.png';

export interface Usuario {
    nombre: string;
    apellido: string;
}

export interface Evento {
    usuario: Usuario; // Cambiar `any` por `Usuario` para mejorar la tipificación
    id_evento: number;
    nombre: string;
    lim_participantes: number;
    lim_edad: number;
    deporte: string;
    fecha: string;
    descripcion?: string;
    costo?: number;
    usuarioId: number;
}

const Category = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

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
            default:
                return defaultImage; 
        }
    };

    const restarUnDia = (fecha: Date) => {
        const fechaModificada = new Date(fecha);
        fechaModificada.setDate(fechaModificada.getDate() - 1);
        return fechaModificada;
    };

    const esHoyOFuturo = (fechaString: string) => {
        const fechaEvento = new Date(fechaString);
        let hoy = new Date();
        hoy = restarUnDia(hoy);

        return (
            fechaEvento > hoy // Compara directamente las fechas
        );
    };

    const eventosFiltrados = eventos.filter((evento) => esHoyOFuturo(evento.fecha));

    const eventosPorFecha = eventosFiltrados.reduce((acc, evento) => {
        const fechaEvento = new Date(evento.fecha);
        const dia = fechaEvento.getUTCDate();
        const mes = fechaEvento.getUTCMonth() + 1;
        const año = fechaEvento.getUTCFullYear() % 100;

        const fechaFormateada = `${dia < 10 ? `0${dia}` : dia}/${mes < 10 ? `0${mes}` : mes}/${año < 10 ? `0${año}` : año}`;

        if (!acc[fechaFormateada]) {
            acc[fechaFormateada] = [];
        }
        acc[fechaFormateada].push(evento);
        return acc;
    }, {} as Record<string, Evento[]>);

    const handleEventoClick = (evento: Evento) => {
        setSelectedEvento(evento);
    };

    const closeModal = () => {
        setSelectedEvento(null);
    };

    const handleUnirseClick = async (eventoId: number) => {
        try {
            // Reemplaza 'USER_CI' con el CI del usuario que está actualmente autenticado
            const userCi = 1234567; // Obtener el CI del usuario logueado desde tu contexto o estado global

            await axios.post(`http://localhost:3000/api/inscribirse `, {
                id_evento: eventoId,
                id_Usuario: userCi,
            });

            // Puedes actualizar el estado si es necesario, por ejemplo, restar un participante
            setEventos((prevEventos) =>
                prevEventos.map((evento) =>
                    evento.id_evento === eventoId ? { ...evento, lim_participantes: (evento.lim_participantes || 0) - 1 } : evento
                )
            );
        } catch (error) {
            console.error('Error al unirse al evento:', error);
            setError('No se pudo unirse al evento');
        }
    };

    const fechasOrdenadas = Object.keys(eventosPorFecha).sort((a, b) => {
        const [diaA, mesA, añoA] = a.split('/').map(Number);
        const [diaB, mesB, añoB] = b.split('/').map(Number);

        const fechaA = new Date(añoA + 2000, mesA - 1, diaA);
        const fechaB = new Date(añoB + 2000, mesB - 1, diaB);

        return fechaA.getTime() - fechaB.getTime();
    });

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="max-w-[1200px] mt-[10rem] mx-auto space-y-10">
            {fechasOrdenadas.map((fecha) => (
                <div key={fecha} className="mb-8">
                    <div className="flex items-center mb-4">
                        <span className="font-bold text-lg">{`Fecha: ${fecha}`}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {eventosPorFecha[fecha].map((evento) => (
                            <div
                                key={evento.id_evento}
                                className={`rounded-lg overflow-hidden shadow-lg cursor-pointer`}
                                onClick={() => handleEventoClick(evento)} 
                            >
                                <div className="flex flex-col h-full">
                                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                        <img
                                            src={getDeporteImage(evento.deporte)}
                                            alt={`Imagen de ${evento.deporte}`}
                                            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                                        />
                                    </div>
                                    <div className="bg-white p-4 flex flex-col justify-between flex-grow relative">
                                        <div>
                                            <p className="text-lg font-semibold">{evento.nombre}</p>
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
                                        </div>
                                        <div className="absolute bottom-4 right-4">
                                            <button 
                                                className="bg-blue-500 text-white font-bold py-1 px-2 rounded"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evita que se cierre el modal al hacer clic
                                                    handleUnirseClick(evento.id_evento);
                                                }}
                                            >
                                                Unirme
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))} 
                    </div>
                </div>
            ))}

            {selectedEvento && (
                <Modal evento={selectedEvento} onClose={closeModal} />
            )}
        </div>
    );
};

export default Category;
