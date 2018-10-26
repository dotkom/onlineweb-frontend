import React from 'react';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import './core.less';

const Core = ({ children }: any) => (
  <div>
    <Header />
    { children }
    <Footer />
  </div>
);

export default Core;
