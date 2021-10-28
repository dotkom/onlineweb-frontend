import EventsContainer from 'events/components/EventsContainer';
import React from 'react';
import Articles from './components/Articles';
import ForCompanies from './components/ForCompanies';
import Offline from './components/Offline';
import ToastOld from './components/ToastOld';

const Frontpage = () => (
  <>
    <ToastOld />
    <EventsContainer />
    <Articles />
    <Offline />
    <ForCompanies />
  </>
);

export default Frontpage;
