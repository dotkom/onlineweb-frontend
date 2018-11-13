import EventsContainer from 'events/components/EventsContainer';
import React from 'react';
import Articles from './components/Articles';
import Offline from './components/Offline';

const Frontpage = () => (
  <>
    <EventsContainer />
    <Articles />
    <Offline />
  </>
);

export default Frontpage;
