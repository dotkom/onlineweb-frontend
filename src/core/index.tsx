import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from './components/Footer/index';
import Header from './components/Header/index';
import './less/core.less';

const Core: FC = ({ children }) => (
  <>
    <Helmet>
      <title>Linjeforeningen Online</title>
    </Helmet>

    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Core;
