import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';
import Main from './components/sections/Main';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

export default App;
