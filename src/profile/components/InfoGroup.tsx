import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

const STATIC_URL = '/static/img/profile/';

class InfoGroup extends React.Component {
  render() {
    const { children, name, icon } = this.props;
    return (
      <div className="profile-info-group">
        { /*<img className="profile-group-icon" src={`${STATIC_URL + icon}.svg`} />*/ }
        <p className="profile-group-name">{ name }</p>
        <div className="profile-group-wrapper">
          { children }
        </div>
      </div>
    );
  }
}

export default InfoGroup;
