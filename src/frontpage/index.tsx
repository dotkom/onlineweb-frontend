import React, { Fragment } from 'react';
import EventsContainer from 'events/components/EventsContainer';
import Offline from './components/Offline';
import Articles from './components/Articles';

const Frontpage = () => (
  <>
    <EventsContainer />
    <Articles />
    <Offline />
  </>
);

export default Frontpage;
