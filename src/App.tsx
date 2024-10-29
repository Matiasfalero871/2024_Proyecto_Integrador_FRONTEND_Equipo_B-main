import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import routes from './routes';

const App: React.FC = () => {

  AOS.init();

  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
 