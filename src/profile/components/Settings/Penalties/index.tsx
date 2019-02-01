import React, { Component, ContextType } from 'react';

import { UserContext } from 'authentication/providers/UserProvider';
import { Pane } from 'common/components/Panes';
import { getMarks, getSuspensions } from 'profile/api/penalties';
import { IMark, ISuspension } from 'profile/models/Penalty';

import Mark from './Mark';
import { PenaltyPane } from './Penalty';
import Rules from './Rules';
import Suspension from './Suspension';

export interface IState {
  marks: IMark[];
  suspensions: ISuspension[];
  loaded: boolean;
}

/**
 * @extends React.Component
 * @summary Entire view for Marks (Prikker) and Suspensions (Suspensjoner).
 * @description Connects to API-endpoint to fetch data.
 */
class Marks extends Component<{}, IState> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;

  public state: IState = {
    loaded: false,
    marks: [],
    suspensions: [],
  };

  public async componentDidMount() {
    this.init();
  }

  public init = async () => {
    const { user } = this.context;
    if (user) {
      const marks = await getMarks(user);
      const suspensions = await getSuspensions(user);
      this.setState({ marks, suspensions, loaded: true });
    }
  };

  public render() {
    const { marks, suspensions, loaded } = this.state;
    return (
      <>
        <PenaltyPane
          name="Prikker"
          ifNone="Du har ingen prikker"
          loaded={loaded}
          penalties={marks}
          render={(mark) => <Mark markUser={mark as IMark} key={mark.expiration_date} />}
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
          <Rules />
        </Pane>
      </>
    );
  }
}

export default Marks;
