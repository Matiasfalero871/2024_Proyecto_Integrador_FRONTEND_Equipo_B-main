import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect, useState } from 'react';

const Planes = [
  {
    title: 'Plan Básico',
    description: 'Un plan accesible para empezar a disfrutar de nuestras funciones.',
    features: [
      { name: 'Acceso a eventos', included: true },
      { name: 'Creación limitada de eventos', included: true },
      { name: 'Soporte 24/7', included: false },
      { name: 'Acceso a contenido exclusivo', included: false },
      { name: 'Acceso a nuevas funciones', included: false },
    ],
    price: 'Free',
  },
  {
    title: 'Plan Pro',
    description: 'El plan ideal para quienes buscan más funcionalidades y control.',
    features: [
      { name: 'Acceso a eventos', included: true },
      { name: 'Creación ilimitada de eventos', included: true },
      { name: 'Soporte 24/7', included: false },
      { name: 'Acceso a contenido exclusivo', included: true },
      { name: 'Acceso a nuevas funciones', included: false },
    ],
    price: '$130',
  },
  {
    title: 'Plan Premium',
    description: 'Todas las funciones premium y soporte prioritario.',
    features: [
      { name: 'Acceso a eventos', included: true },
      { name: 'Creación ilimitada de eventos', included: true },
      { name: 'Soporte 24/7', included: true },
      { name: 'Acceso a contenido exclusivo', included: true },
      { name: 'Acceso a nuevas funciones', included: true },
    ],
    price: '$200',
  },
];

export default function Subscripcion() {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    AOS.init();
  }, [currentIndex]);

  return (
    <div className="bg-white mt-[80px] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Planes de suscripción</h2>
          <p className="mt-4 text-lg leading-7 text-gray-600">
            Mejora tu plan para gozar de todos los beneficios de la app.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-y-8 sm:mt-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3"
        data-aos="fade-up"
        data-aos-duration="1200">
          {Planes.map((plan, index) => (
            <div
              key={plan.title}
              className={`relative mx-auto w-full max-w-xs sm:max-w-md lg:max-w-sm rounded-2xl ring-1 ring-gray-200 p-6 sm:p-8 lg:p-10 lg:flex lg:flex-col lg:justify-center lg:py-12 transition-transform transform hover:scale-105 hover:shadow-md
                ${index === 1 ? 'z-10 bg-green-100 ring-green-500 shadow-sm' : ''}`}
            >
              <h3 className="text-xl font-bold tracking-tight text-gray-900">{plan.title}</h3>
              <p className="mt-4 text-base leading-6 text-gray-600">{plan.description}</p>
              <div className="mt-8 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">Este plan incluye</h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul role="list" className="mt-6 grid grid-cols-1 gap-2 text-sm leading-5 text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex gap-x-3">
                    {feature.included ? (
                      <CheckIcon aria-hidden="true" className="h-5 w-4 flex-none text-indigo-600" />
                    ) : (
                      <XMarkIcon aria-hidden="true" className="h-5 w-4 flex-none text-red-600" />
                    )}
                    {feature.name}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</p>
                {plan.price !== 'Free' && (
                  <a
                    href="#"
                    className="mt-3 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Obtener Acceso
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
