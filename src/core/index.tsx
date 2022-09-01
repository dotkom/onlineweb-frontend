import Head from 'next/head';
import React, { FC } from 'react';

import Footer from './components/Footer/index';
import Header from './components/Header/index';
import './less/core.less';
import { ToastMessages } from './utils/toast/ToastMessages';
import { AuthenticationProvider } from 'authentication/providers/AuthenticationProvider';
import { SilentRenew } from 'authentication/components/SilentRenew';

const Core: FC = ({ children }) => (
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

export default Core;
