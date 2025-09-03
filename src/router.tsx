import { createBrowserRouter, RouteObject } from 'react-router-dom';

import App from './App';
import AuthGuard from './features/auth/components/AuthGuard';
import NewMoment from './features/moment/components/CreateMomentForm';
import Moment from './features/moment/components/Moment';
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
          <AuthGuard>
            <Mypage />{' '}
          </AuthGuard>
        ),
      },
      { path: '/rooms', element: <RoomSearchPage /> },
      {
        path: '/rooms/new',
        element: (
          <AuthGuard>
            <NewRoom />
          </AuthGuard>
        ),
      },
      {
        path: '/rooms/:roomId',
        element: (
          <AuthGuard>
            <RoomViewPage />
          </AuthGuard>
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
