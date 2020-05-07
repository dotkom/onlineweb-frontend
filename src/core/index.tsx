import Head from 'next/head';
import React, { FC } from 'react';

import { AuthenticationProvider } from 'authentication/components/AuthenticationProvider';
import { SilentRenew } from 'authentication/components/SilentRenew';
import Footer from './components/Footer/index';
import './less/core.less';
import { ToastMessages } from './utils/toast/ToastMessages';
import { PageHeader } from './components/PageHeader';

const Core: FC = ({ children }) => (
  <>
    <Head>
      <title>Linjeforeningen Online</title>
    </Head>
    <PageHeader />
    <main>{children}</main>
    <Footer />
    <ToastMessages />
    <AuthenticationProvider />
    <SilentRenew />
  </>
);

export default Core;
