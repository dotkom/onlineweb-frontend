import React from 'react';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import './less/core.less';

const Core = ({ children }: any) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Core;
