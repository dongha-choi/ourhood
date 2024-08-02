import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Signup from './pages/Signup';
import Rooms from './pages/Rooms';

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
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
