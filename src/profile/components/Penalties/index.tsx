import React, { Component } from 'react';
import { IMark, ISuspension } from '../../models/Penalty';
import Mark from './Mark';
import Rules from './Rules';
import Suspension from './Suspension';
import Placeholder from './Placeholder';
import { getMarks, getSuspensions } from '../../api/penalties';

export interface IState {
  marks: IMark[];
  suspensions: ISuspension[]
  loaded: boolean
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

  async componentDidMount() {
    const marks = await getMarks();
    const suspensions = await getSuspensions();
    this.setState({ marks, suspensions, loaded: true })
  }

  render() {
    const { marks, suspensions, loaded } = this.state;
    return(
      <div>
        <div>
          <div>
          { /** If not loaded from API; show placeholder. If list of marks is empty; show empty-text */ }
            { !loaded ? <Placeholder /> : marks.length
              ? marks.map((mark) => <Mark penalty={mark} key={mark.title}/>)
              : <p>Du har ingen prikker</p>
            }
          </div>
          <div>
            { /** If not loaded from API; show placeholder. If list of suspensions is empty; show empty-text */ }
            { !loaded ? <Placeholder /> : suspensions.length
              ? suspensions.map((suspension) => <Suspension penalty={suspension} key={suspension.title} />)
              : <p>Du har ingen suspensjoner</p>
            }
          </div>
        </div>
        <Rules />
      </div>
    )
  }
}

export default Marks;
