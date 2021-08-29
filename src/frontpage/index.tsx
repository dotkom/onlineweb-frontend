import EventsContainer from 'events/components/EventsContainer';
import React, { FC } from 'react';
import Articles, { Article } from './components/Articles';
import Offline from './components/Offline';
import ToastOld from './components/ToastOld';

interface IProps {
  articles: Article[];
}

const Frontpage: FC<IProps> = (props) => {
  return (
    <>
      <ToastOld />
      <EventsContainer />
      <Articles {...props} />
      <Offline />
    </>
  );
};

export default Frontpage;
