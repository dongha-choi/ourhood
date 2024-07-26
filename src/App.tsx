import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
