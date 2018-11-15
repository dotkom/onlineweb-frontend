import React, { Component } from 'react';
import { getMarks, getSuspensions } from '../../../api/penalties';
import { IMark, ISuspension } from '../../../models/Penalty';
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
  constructor(props: {}) {
    super(props);

    this.state = {
      marks: [],
      suspensions: [],
      loaded: false,
    } as IState;
  }

  public async componentDidMount() {
    const marks = await getMarks();
    const suspensions = await getSuspensions();
    this.setState({ marks, suspensions, loaded: true });
  }

  public render() {
    const { marks, suspensions, loaded } = this.state;
    return (
      <>
        <h2>Prikker</h2>
        <div>
          {/** If not loaded from API; show placeholder. If list of marks is empty; show empty-text */}
          {!loaded ? (
            <Placeholder />
          ) : marks.length ? (
            marks.sort(Mark.sortByExpiration).map((mark) => <Mark penalty={mark} key={mark.added_date} />)
          ) : (
            <p>Du har ingen prikker</p>
          )}
        </div>
        <h2>Suspensjoner</h2>
        <div>
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
        </div>
        <Rules />
      </>
    );
  }
}

export default Marks;
