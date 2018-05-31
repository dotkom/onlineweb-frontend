import React, { ReactNode } from 'react';
import store from 'core/store';
import { logIn } from './actions';
import './less/core.less'
import { Link } from 'react-router-dom';
import { routes } from 'App';
import Header from './components/Header';
import Footer from './components/Footer';

declare global {
  interface Window {
    store: any;
    logIn: Function;
  }
};

window.store = store;
window.logIn = logIn;

const Core = ({ children }: any) => (
  <div>
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
