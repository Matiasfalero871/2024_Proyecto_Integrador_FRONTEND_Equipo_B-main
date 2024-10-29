import { RouteObject } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import NotFoundPage from './pages/Errors/404';
import { EventsPage } from './pages/Events/Events';
import CreateEvent from './pages/Events/Events Components/CrearEvento';
import Profile from './pages/Profile/userProfile';
import Dashboard from './pages/Dashboard/Dashboard';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/events',
    element: <EventsPage/>
  },
  {
    path: '/createEvent',
    element: <CreateEvent/>
  },
  {
    path: '/profile',
    element: <Profile/>

  },

  {path: '/dashboard',
  element: <Dashboard/>

},



];

export default routes;
