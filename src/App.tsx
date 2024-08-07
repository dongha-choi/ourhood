import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';
import { AuthContextProvider } from './context/AuthContext';
import Main from './components/sections/Main';

const App: React.FC = () => {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </AuthContextProvider>
      <Footer />
    </>
  );
};

export default App;
