import React from 'react';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import './less/core.less';

const Core = ({ children }: any) => (
  <div>
    <Header />
    { children }
    <Footer />
  </div>
);

export default Core;
