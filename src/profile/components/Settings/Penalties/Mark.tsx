import React, { Fragment } from 'react';
import Penalty from './Penalty';
import { IMark } from '../../../models/Penalty';
import { DateTime } from 'luxon';
import style from './penalties.less';

class Mark extends Penalty<IMark> {
  public render() {
    const { penalty } = this.props;
    const { collapsed } = this.state;
    const expiration = DateTime.fromISO(penalty.expiration_date);
    const added = DateTime.fromISO(penalty.added_date);
    const completion = this.getPenaltyCompletion(penalty);
    const completionColor = this.getCompletionColor(completion);
    return (
      <div className={style.gridRow}>
        <div onClick={() => this.toggleCollapse()}>
          <h4 className={style.title}>
            <p>{ penalty.title }</p>
            <span>{ added.toFormat('d MMMM y') }</span>
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
        <div className={style.progressBar} style={{ width: completion + '%', backgroundColor: completionColor }} />
      </div>
    );
  }
}

export default Mark;
