import React, { Component } from 'react';

import { Pane } from 'common/components/Panes';
import { getMarkRules, getMarks, getSuspensions } from 'profile/api/penalties';
import { IMark, IMarkRule, ISuspension } from 'profile/models/Penalty';

import Mark from './Mark';
import { PenaltyPane } from './Penalty';
import Rules from './Rules';
import Suspension from './Suspension';

export interface IState {
  marks: IMark[];
  markRules: IMarkRule[];
  suspensions: ISuspension[];
  loaded: boolean;
}

/**
 * @extends React.Component
 * @summary Entire view for Marks (Prikker) and Suspensions (Suspensjoner).
 * @description Connects to API-endpoint to fetch data.
 */
class Marks extends Component<{}, IState> {
  public state: IState = {
    loaded: false,
    marks: [],
    markRules: [],
    suspensions: [],
  };

  public async componentDidMount() {
    this.init();
  }

  public init = async () => {
    const marks = await getMarks();
    const markRules = await getMarkRules();
    const suspensions = await getSuspensions();
    this.setState({ marks, markRules, suspensions, loaded: true });
  };

  public render() {
    const { marks, markRules, suspensions, loaded } = this.state;
    return (
      <>
        <PenaltyPane
          name="Prikker"
          ifNone="Du har ingen prikker"
          loaded={loaded}
          penalties={marks}
          render={(mark) => <Mark mark={mark as IMark} key={mark.expiration_date} />}
        />
        <PenaltyPane
          name="Suspensjoner"
          ifNone="Du har ingen suspensjoner"
          loaded={loaded}
          penalties={suspensions}
          render={(suspension) => (
            <Suspension suspension={suspension as ISuspension} key={suspension.expiration_date} />
          )}
        />
        <Pane>
          <Rules rules={markRules} />
        </Pane>
      </>
    );
  }
}

export default Marks;
