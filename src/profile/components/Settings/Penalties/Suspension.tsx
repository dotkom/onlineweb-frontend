import React, { Fragment } from 'react';
import { DateTime, Interval } from 'luxon';
import Penalty from './Penalty';
import { ISuspension } from '../../../models/Penalty';
import style from './penalties.less';

class Suspension extends Penalty<ISuspension> {
  public render() {
    const { penalty } = this.props;
    const { collapsed } = this.state;
    const expiration = DateTime.fromISO(penalty.expiration_date);
    const added = DateTime.fromISO(penalty.added_date);
    const completion = this.getPenaltyCompletion(penalty);
    const completionColor = this.getCompletionColor(completion);
    return (
      <div className={style.gridRow}>
        <div onClick={() => super.toggleCollapse()}>
          <h4 className={style.title}>
            <p>{ penalty.title }</p>
            <span>{ added.toFormat('d MMMM y') }</span>
          </h4>
          { collapsed
            ? null
            : <>
               <p>{ penalty.description }</p>
                { penalty.expiration_date.length
                  ? <p><b>Utløpsdato: </b>{ expiration.toFormat('d MMMM y') }</p>
                  : null
                }
              </>
          }
          </div>
        <div className={style.progressBar} style={{ width: completion + '%', backgroundColor: completionColor }} />
      </div>
    );
  }
}

export default Suspension;
