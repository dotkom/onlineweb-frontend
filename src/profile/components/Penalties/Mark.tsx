import React, { Fragment } from 'react';
import Penalty from './Penalty';
import { IMark } from '../../models/Penalty';
import { DateTime } from 'luxon';

class Mark extends Penalty<IMark> {
  render() {
    const { penalty } = this.props;
    const { collapsed } = this.state;
    const expiration = DateTime.fromISO(penalty.expiration_date)
    const added = DateTime.fromISO(penalty.added_date)
    const completion = this.getPenaltyCompletion(penalty);
    const completionColor = this.getCompletionColor(completion);
    return (
      <div className="grid-row">
        <div className="col-md-12" onClick={() => this.toggleCollapse()}>
          <h4>
            { penalty.title }
            <span className="pull-right">{ added.toFormat('d MMMM y') }</span>
          </h4>
          { collapsed ? null :
            <>
            { /** TIL: (<></>) === (<Fragment></Fragment>) */ }
              <p>{ penalty.description }</p>
              <p><b>Katogori: </b>{ penalty.category }</p>
              <p><b>Utløpsdato: </b>{ expiration.toFormat('d MMMM y') }</p>
            </>
          }
        </div>
        <div className="progress-bar" style={{ width: completion + '%', backgroundColor: completionColor }} />
      </div>
    )
  }
}

export default Mark;
