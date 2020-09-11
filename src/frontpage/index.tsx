import EventsContainer from 'events/components/EventsContainer';
import React from 'react';
import Articles from './components/Articles';
import Offline from './components/Offline';
import ToastOld from './components/ToastOld';

const Frontpage = () => (
  <>
    <ToastOld />
    <EventsContainer />
    <Articles />
    <Offline />
  </>
);

export default Frontpage;
