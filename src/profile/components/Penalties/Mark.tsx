import React, { Fragment } from 'react';
import Penalty from './Penalty';
import { IMark } from '../../models/Penalty';

class Mark extends Penalty<IMark> {
  render() {
    const { penalty } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="row row-space">
        <div className="col-md-12" onClick={() => this.toggleCollapse()}>
          <h4>
            { penalty.title }
            <span className="pull-right">{ penalty.added_date }</span>
          </h4>
          { collapsed ? null :
            <>
            { /** TIL: (<></>) === (<Fragment></Fragment>) */ }
              <p>{ penalty.description }</p>
              <p><b>Katogori: </b>{ penalty.category }</p>
              <p><b>Utløpsdato: </b>{ penalty.expiration_date }</p>
              <p><b>{ this.getPenaltyCompletion(penalty) }</b></p>
            </>
          }
        </div>
      </div>
    )
  }
}

export default Mark;
