import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Signup from './pages/Signup';
import Rooms from './pages/Rooms';
import NewRoom from './pages/NewRoom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <LogIn /> },
      { path: 'signup', element: <Signup /> },
      { path: 'rooms', element: <Rooms /> },
      { path: 'rooms/new', element: <NewRoom /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
