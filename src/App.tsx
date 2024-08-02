import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';
import { AuthContextProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Outlet />
      </AuthContextProvider>
      <Footer />
    </>
  );
};

export default App;
