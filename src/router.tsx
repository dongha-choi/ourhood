import { createBrowserRouter, RouteObject } from 'react-router-dom';

import App from './App';
import PrivateRoute from './components/auth/PrivateRoute';
import Moment from './components/moment/Moment';
import NewMoment from './components/moment/NewMoment';
import RoomBody from './features/room/search/components/RoomBody';
import RoomEdit from './features/room/search/components/RoomEdit';
import RoomHeader from './features/room/search/components/RoomHeader';
import Home from './pages/Home';
import Login from './pages/LogIn';
import Mypage from './pages/Mypage';
import NewRoom from './pages/NewRoom';
import NotFound from './pages/NotFound';
import Room from './pages/Room';
import RoomList from './pages/RoomList';
import Signup from './pages/SignUp';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/mypage',
        element: (
          <PrivateRoute>
            <Mypage />{' '}
          </PrivateRoute>
        ),
      },
      { path: '/rooms', element: <RoomList /> },
      {
        path: '/rooms/new',
        element: (
          <PrivateRoute>
            <NewRoom />
          </PrivateRoute>
        ),
      },
      {
        path: '/rooms/:roomId',
        element: (
          <PrivateRoute>
            <Room />
          </PrivateRoute>
        ),
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
          {
            path: 'moments/new',
            element: (
              <PrivateRoute>
                <NewMoment />
              </PrivateRoute>
            ),
          },
          {
            path: 'moments/:momentId',
            element: (
              <PrivateRoute>
                <RoomHeader />
                <Moment />
              </PrivateRoute>
            ),
          },
          {
            path: 'edit',
            element: <RoomEdit />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
