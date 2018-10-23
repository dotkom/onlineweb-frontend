import React, { Fragment } from 'react';
import EventsContainer from 'events/components/EventsContainer';
import Offline from './components/Offline';
import Header from './components/Header';
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
