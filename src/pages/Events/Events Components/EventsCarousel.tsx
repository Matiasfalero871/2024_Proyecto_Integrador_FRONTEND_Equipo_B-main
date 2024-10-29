import { useState, useEffect } from 'react';

const eventItems = [
  {
    name: 'Festival de la Independencia 2024',
    date: '13, 14 y 15 de Septiembre',
    location: 'Vivero Municipal, Ruta 5 y rotonda de ingreso sur',
    description: 'El Festival de la Independencia nació con el objetivo de fortalecer la identidad de Florida...',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    name: 'Torneo de Fútbol Amistoso',  
    date: '20 de Octubre',
    location: 'Estadio Central',
    description: 'Torneo amistoso de fútbol con equipos locales...',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
  {
    name: 'Prueba',
    date: '20 de Octubre',
    location: 'Estadio Central',
    description: 'Torneo amistoso de fútbol con equipos locales...',
    imageUrl: 'https://via.placeholder.com/600x400',
  },
];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? eventItems.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === eventItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='flex justify-center mt-[10rem]'>
    <div className="w-2/4 bg-white text-black h-[400px] flex shadow-lg rounded-lg overflow-hidden relative">
      <div className="flex w-3/5 overflow-hidden relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {eventItems.map((event) => (
            <div key={event.name} className="w-full flex-shrink-0">
              <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-800 text-white shadow-lg"
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

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-800 text-white shadow-lg"
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

      {/* Text Section */}
      <div className="w-1/3 bg-white p-8 text-left flex flex-col justify-center relative">
        <div
          className={`transition-opacity transform duration-500 ease-in-out ${isTransitioning ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}
        >
          <h2 className="text-2xl font-bold mb-2">{eventItems[currentIndex].name}</h2>
          <p className="text-lg mb-4">{eventItems[currentIndex].date}</p>
          <p className="text-lg mb-4">{eventItems[currentIndex].location}</p>
          <p className="text-base leading-relaxed">{eventItems[currentIndex].description}</p>
        </div>
      </div>
    </div>
    </div>
  );
}
