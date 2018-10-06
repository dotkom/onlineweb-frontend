import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ArticlesContainer from 'articles/containers/ArticlesContainer';
import EventsContainer from 'events/components/EventsContainer';
import Offline from './components/Offline';
import Business from './components/Business';
import Subnav from './components/Subnav';
import './initFrontpage';
import './less/frontpage.less';
import '../career/less/career.less';
import { IFrontpageEvent } from 'events/models/Event';
import { IArticle } from 'articles/models/Article';

const Frontpage = () => (
  <Fragment>
    <AppContainer>
      <div className="container">
        <section id="events">
          <EventsContainer />
        </section>
      </div>
    </AppContainer>
    <AppContainer>
      <div className="container">
        <section id="articles">
          <ArticlesContainer />
        </section>
      </div>
    </AppContainer>
    <div className="container">
      <Offline />
    </div>
    <div className="container">
      <Business />
    </div>
  </Fragment>
);

export default Frontpage;
