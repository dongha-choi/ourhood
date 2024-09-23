import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';
import NewMoment from './components/moment/NewMoment';
import RoomBody from './components/room/RoomBody';
import RoomHeader from './components/room/RoomHeader';
import Moment from './components/moment/Moment';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/rooms', element: <Rooms /> },
      { path: '/rooms/new', element: <NewRoom /> },
      {
        path: '/rooms/:roomId',
        element: <Room />,
        children: [
          {
            index: true,
            element: (
              <>
                <RoomHeader />
                <RoomBody />
              </>
            ),
          },
          { path: 'moments/new', element: <NewMoment /> },
          {
            path: 'moments/:momentId',
            element: (
              <>
                <RoomHeader />
                <Moment />
              </>
            ),
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
