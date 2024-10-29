import { useState, useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Tomy from '../../../assets/Tomas.png';
import maty from '../../../assets/Matias.jpg';
import steffi from '../../../assets/Steffi.jpg';
import flor from '../../../assets/Flor.jpg';

const teamMembers = [
  {
    name: 'Tomas Suarez',
    position: 'Desarrollo Web',
    imageUrl: Tomy,
  },
  {
    name: 'Matias Falero',
    position: 'Base de Datos y diseño',
    imageUrl: maty,
  },
  {
    name: 'Florencia Rosales',
    position: 'Sistemas operativo, base de datos, ada',
    imageUrl: flor,
  },
  {
    name: 'Steffani Balmaseda',
    position: 'ADA, Gestion empresarial',
    imageUrl: steffi,
  },
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init();
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-[#001f3f] text-white h-screen flex">
      <div className="flex flex-col justify-center items-center w-1/2 relative">
        <button
          onClick={prevSlide}
          className="absolute left-[calc(30%-15px-2rem)] transform -translate-y-1/2 top-1/2 p-3 rounded-full transition shadow-lg shadow-black"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-4 mt-4" data-aos="fade-up" data-aos-duration="1200">Nuestro equipo</h2>
        <div className="w-64 max-w-xs mx-auto overflow-hidden relative">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="flex-shrink-0 w-full"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <div
                  className="bg-white text-black rounded-2xl ring-1 ring-gray-200 p-8 flex flex-col justify-start items-center"
                  style={{ width: '15rem', height: '20rem' }}
                >
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mt-4"
                  />
                  <h3 className="mt-6 text-xl font-bold tracking-tight">{member.name}</h3>
                  <p className="mt-2 text-base leading-6">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-[calc(30%-15px-2rem)] transform -translate-y-1/2 top-1/2 p-3 rounded-full transition shadow-lg shadow-black"
          data-aos="fade-left"
          data-aos-duration="1200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="w-1/2 flex items-center justify-center p-8 text-white">
        <div className="text-left">
          <h2 className="text-3xl font-bold mb-4" data-aos="fade-up" data-aos-duration="1200">¿Qué ofrecemos?</h2>
          <p className="text-lg leading-relaxed mb-4" data-aos="fade-down" data-aos-duration="1200">
            "Falta Uno!" es la página que transforma ese “casi” en un rotundo “¡Vamos!” con la facilidad de un clic. Sabemos lo frustrante que puede ser tener todo organizado para un partido, campeonato, o cualquier actividad recreativa, solo para darte cuenta de que te falta una persona para completar el equipo. Ahí es donde entra en juego "Falta Uno!", tu mejor aliado para asegurarte de que siempre estés listo para la acción. Con nuestra página, ese último pase que necesitas para armar el equipo perfecto está a solo un toque de distancia.
          </p>
          <p className="mt-4 text-lg leading-relaxed" data-aos="fade-down" data-aos-duration="1200">
            Nuestra página te conecta al instante con una comunidad activa de personas que comparten tus intereses y están tan motivadas como tú para salir, jugar, competir o simplemente disfrutar del aire libre. Ya sea que estés buscando un compañero para un partido de fútbol, alguien con quien compartir una caminata o completar un grupo para una sesión de entrenamiento, "Falta Uno!" lo hace posible.
          </p>
        </div>
      </div>
    </div>
  );
}
