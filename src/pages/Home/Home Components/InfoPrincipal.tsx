import React from 'react';
import { Link } from 'react-router-dom';

const InfoPrincipal: React.FC = () => {
  return (
    <div className="w-1/2 h-[30vh] absolute left-1/2 top-[33%] transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-5 flex flex-col justify-center items-center">
      <h1 className="text-center text-[#1F335D] text-[50px] font-bold">
        ¿Estás buscando hacer deporte?
      </h1>
      <p className="text-center text-[#1F335D] text-[25px] mt-[20px]">
        Completa tu equipo o consigue uno con <strong>Falta Uno</strong>, una app innovadora con la cual formar un equipo para un partido de Futbol, Basquet, Padel o cualquier actividad recreativa no sera un problema.
      </p>
      <Link to="/events" className="mt-4 block w-[200px] rounded-md bg-[#001f3f] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        Ver Actividades
      </Link>
    </div>
  );
};

export default InfoPrincipal;
