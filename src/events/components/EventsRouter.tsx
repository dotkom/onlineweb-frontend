import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventsContainer from './EventsContainer';
import DetailView from './DetailView';
import HttpError from 'core/components/errors/HttpError';

export const routes = {
  root: '/events',
  detail: '/events/:id'
}

const EventsRouter = ({  }) => (
  <div className="container">
    <section id="events">
      <Switch>
        <Route exact path={routes.root} component={EventsContainer} />
        <Route path={routes.detail} component={DetailView} />
        <Route path="*" render={() => <HttpError code={404}/>} />
      </Switch>
    </section>
  </div>
)

export default EventsRouter;
