import React, { Component, ContextType } from 'react';

import { UserContext } from 'authentication/providers/UserProvider';
import { Pane } from 'common/components/Panes';
import { getMarks, getSuspensions } from 'profile/api/penalties';
import { IMark, ISuspension } from 'profile/models/Penalty';

import Mark from './Mark';
import Placeholder from './Placeholder';
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
        <Pane>
          <h2>Prikker</h2>
          {/** If not loaded from API; show placeholder. If list of marks is empty; show empty-text */}
          {!loaded ? (
            <Placeholder />
          ) : marks.length ? (
            marks.sort(Mark.sortByExpiration).map((mark) => <Mark penalty={mark} key={mark.added_date} />)
          ) : (
            <p>Du har ingen prikker</p>
          )}
        </Pane>
        <Pane>
          <h2>Suspensjoner</h2>
          {/** If not loaded from API; show placeholder. If list of suspensions is empty; show empty-text */}
          {!loaded ? (
            <Placeholder />
          ) : suspensions.length ? (
            suspensions
              .sort(Suspension.sortByExpiration)
              .map((suspension) => <Suspension penalty={suspension} key={suspension.added_date} />)
          ) : (
            <p>Du har ingen suspensjoner</p>
          )}
        </Pane>
        <Pane>
          <Rules />
        </Pane>
      </>
    );
  }
}

export default Marks;
