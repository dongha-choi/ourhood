import { createBrowserRouter, RouteObject } from 'react-router-dom';

import App from './App';
import PrivateRoute from './components/auth/PrivateRoute';
import Moment from './features/moment/components/Moment';
import NewMoment from './features/moment/components/NewMoment';
import NewRoom from './features/room/pages/RoomCreatePage';
import RoomSearchPage from './features/room/pages/RoomSearchPage';
import RoomViewPage from './features/room/pages/RoomViewPage';
import RoomBody from './features/room/view/components/RoomBody';
// import RoomEdit from './features/room/view/components/RoomEdit';
import RoomHeader from './features/room/view/components/RoomHeader';
import Home from './pages/Home';
import Login from './pages/LogIn';
import Mypage from './pages/Mypage';
import NotFound from './pages/NotFound';
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
      { path: '/rooms', element: <RoomSearchPage /> },
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
            <RoomViewPage />
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
          // {
          //   path: 'edit',
          //   element: <RoomEdit />,
          // },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
