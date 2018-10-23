import Login from 'authentication/components/Login';
import EventsContainer from 'events/components/EventsContainer';
import React, { Fragment } from 'react';
import Articles from './components/Articles';
import Offline from './components/Offline';

const Frontpage = () => (
  <>
    <Login />
    <EventsContainer />
    <Articles />
    <Offline />
  </>
);

export default Frontpage;
