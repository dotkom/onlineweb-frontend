import React, { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from './components/Footer/index';
import Header from './components/Header/index';
import './less/core.less';

const Core: FC = ({ children }) => (
  <HelmetProvider>
    <Helmet>
      <title>Linjeforeningen Online</title>
    </Helmet>

    <Header />
    <main>{children}</main>
    <Footer />
  </HelmetProvider>
);

export default Core;
