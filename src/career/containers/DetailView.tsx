import { getCareerOpportunity } from 'career/api';
import { ICareerOpportunity } from 'career/models/Career';
import HttpError from 'core/components/errors/HttpError';
import React from 'react';
import InfoBox from '../components/JobDetails';

export interface IProps {
  match: { params: { id: string } };
}

export interface IState {
  job: ICareerOpportunity | undefined;
}

class DetailView extends React.Component<IProps, IState> {
  public state: IState = {
    job: undefined,
  };

  public async componentDidMount() {
    window.scrollTo(0, 0);
    const id = parseInt(this.props.match.params.id, 10);
    const job = await getCareerOpportunity(id);
    this.setState({ job });
  }

  public render() {
    const { job } = this.state;
    return job ? <InfoBox {...job} /> : <HttpError code={404} text="Denne karrieremuligheten eksisterer ikke." />;
  }
}

export default DetailView;
