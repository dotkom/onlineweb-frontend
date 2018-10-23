import React from 'react';
import Header from './components/Header/index';
import Footer from './components/Footer/index';

const Core = ({ children }: any) => (
  <div style={{ backgroundColor: '#f3f3f3' }}>
    <Header />
    { children }
    <Footer />
  </div>
);

export default Core;
