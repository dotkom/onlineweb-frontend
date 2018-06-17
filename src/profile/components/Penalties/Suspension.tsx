import React, { Fragment } from 'react';
import { DateTime, Interval } from 'luxon';
import Penalty from './Penalty';
import { ISuspension } from '../../models/Penalty';

class Suspension extends Penalty<ISuspension> {
  render() {
    const { penalty } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="row row-space">
        <div className="col-md-12" onClick={() => super.toggleCollapse()}>
          <h4>
            { penalty.title }
            <span className="pull-right">{ penalty.added_date }</span>
          </h4>
          <p>{ penalty.description }</p>
          { penalty.expiration_date.length ? 
            <p>
              <b>Utløpsdato: </b>
              { penalty.expiration_date }
            </p> : null
          }
        </div>
      </div>
    )
  }
}

export default Suspension;
