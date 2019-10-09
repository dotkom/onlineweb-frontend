import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from './components/Footer/index';
import Header from './components/Header/index';
import './less/core.less';
import { ToastMessages } from './utils/toast/ToastMessages';

const Core: FC = ({ children }) => (
  <>
    {/*
    // @ts-ignore-next-line TS2604 */}
    <Helmet>
      <title>Linjeforeningen Online</title>
    </Helmet>
    <Header />
    <main>{children}</main>
    <Footer />
    <ToastMessages />
  </>
);

export default Core;
