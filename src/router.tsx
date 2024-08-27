import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Rooms from './pages/Rooms';
import Signup from './pages/Signup';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/login', element: <LogIn /> },
      { path: '/signup', element: <Signup /> },
      { path: '/rooms', element: <Rooms /> },
      { path: '/rooms/new', element: <NewRoom /> },
      { path: '/rooms/:roomId', element: <Room /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
