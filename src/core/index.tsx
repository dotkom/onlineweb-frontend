import React, { FC } from 'react';
import Footer from './components/Footer/index';
import Header from './components/Header/index';
import './less/core.less';

const Core: FC = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Core;
