import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Profile from '../components/Profile';
import Search from '../components/Search';

const history = createBrowserHistory();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
        data: undefined
    };

    this.API_URL = '/api/v1/users?format=json';
  }

  componentDidMount() {
    fetch(this.API_URL, { credentials: 'same-origin' })
        .then(response => response.json())
        .then(data => this.setState({id: data.results[1].username}));
  }

  render() {
    const { id } = this.state
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/profile/"
            render={props => <Profile {...props} id={id}/>}
          />
          <Route
            exact
            path="/profile/search/"
            render={props => <Search {...props} id={id} />}
          />
          <Route
            path="/profile/:id"
            render={props => <Profile {...props} id={id} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
