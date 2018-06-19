import React, { ReactNode, ReactChild, ReactChildren } from 'react';
import './less/core.less'
import { Link } from 'react-router-dom';
import { routes } from 'App';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import UserProvider from 'authentication/providers/UserProvider';

/*
const Providers: ReactNode[] = [
  UserProvider
]

const Provide = (nodes: ReactNode[]): ReactNode => {
  return(
    <>
      { nodes.reduce((Accumulator, Node) => <Accumulator><Node /></Accumulator>) }
    </>
  )
}
*/

const Core = ({ children }: { children: ReactChildren }) => (
  <UserProvider>
    <Header />
    {/*% block submenu %}{% endblock %*/}
    {/*% if messages %*/}
    {/*% block content %}{% endblock %*/}
    { children }
    <div className="container" id="isloading-component"></div>
    <Footer />
  </UserProvider>
);

export default Core;
