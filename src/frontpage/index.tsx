import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import EventsContainer from 'events/components/EventsContainer';
import Offline from './components/Offline';
import Business from './components/Business';
import Subnav from './components/Subnav';
import Header from './components/Header';
import './initFrontpage';
import './less/frontpage.less';
import '../career/less/career.less';
import { IFrontpageEvent } from 'events/models/Event';
import { IArticle } from 'articles/models/Article';
import Articles from './components/Articles';

const Frontpage = () => (
  <Fragment>
    <div className="container">
      <section id="events">
        <EventsContainer />
      </section>
    </div>
    <div className="container">
      <section id="articles">
      <Header title="artikler"/>
        <Articles />
      </section>
    </div>
    <div className="container">
      <Header title="offline" />
      <Offline />
    </div>
  </Fragment>
);

export default Frontpage;
