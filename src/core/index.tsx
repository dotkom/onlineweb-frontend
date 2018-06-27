import React, { ReactNode } from 'react';
import './less/core.less'
import { Link } from 'react-router-dom';
import { routes } from 'App';
import Header from './components/Header/index';
import Footer from './components/Footer/index';

const Core = ({ children }: any) => (
  <div style={{ backgroundColor: '#f3f3f3' }}>
    <Header />
    {/*% block submenu %}{% endblock %*/}
    {/*% if messages %*/}
    {/*% block content %}{% endblock %*/}
    { children }
    <div className="container" id="isloading-component"></div>
    <Footer />
  </div>
);

export default Core;
