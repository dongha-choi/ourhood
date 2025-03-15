import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Login from './pages/LogIn';
import Signup from './pages/SignUp';
import Mypage from './pages/Mypage';
import Home from './pages/Home';
import RoomList from './pages/RoomList';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';
import NewMoment from './components/moment/NewMoment';
import RoomBody from './components/room/RoomBody';
import RoomHeader from './components/room/RoomHeader';
import Moment from './components/moment/Moment';
import PrivateRoute from './components/auth/PrivateRoute';
import RoomEdit from './components/room/RoomEdit';

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
          {
            path: 'moments/new',
            element: <NewMoment />,
          },
          {
            path: 'moments/:momentId',
            element: (
              <>
                <RoomHeader />
                <Moment />
              </>
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
