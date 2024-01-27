import Head from 'next/head';
import React, { FC } from 'react';

import Footer from './components/Footer/index';
import Header from './components/Header/index';
import './less/core.less';
import { ToastMessages } from './utils/toast/ToastMessages';
import { AuthenticationProvider } from 'authentication/providers/AuthenticationProvider';

const Core: FC = ({ children }) => {
  // useEffect(() => {
  //   const splash = sessionStorage.getItem('splash');
  //   const isLandingPage = window.location.pathname === '/';
  //   const shouldRedirect = !splash || new Date().getTime() - new Date(splash).getTime() > 1000 * 60 * 10;
  //   if (shouldRedirect && isLandingPage) {
  //     sessionStorage.setItem('splash', `${new Date()}`);
  //     window.location.assign('https://splash.online.ntnu.no');
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Linjeforeningen Online</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
      <ToastMessages />
      <AuthenticationProvider />
    </>
  );
};

export default Core;
