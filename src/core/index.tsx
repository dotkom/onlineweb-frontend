import Head from 'next/head';
import React, { FC, useEffect } from 'react';

import Footer from './components/Footer/index';
import Header from './components/Header/index';
import './less/core.less';
import { ToastMessages } from './utils/toast/ToastMessages';
import { AuthenticationProvider } from 'authentication/providers/AuthenticationProvider';
import { SilentRenew } from 'authentication/components/SilentRenew';
import { useRouter } from 'next/router';

const Core: FC = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const splash = localStorage.getItem('splash');
    const isLandingPage = window.location.pathname === '/';
    const shouldRedirect = !splash || new Date().getTime() - new Date(splash).getTime() > 1000 * 60 * 10;
    if (shouldRedirect && isLandingPage) {
      localStorage.setItem('splash', `${new Date()}`);
      router.push('https://splash.online.ntnu.no');
    }
  }, []);

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
      <SilentRenew />
    </>
  );
};

export default Core;
