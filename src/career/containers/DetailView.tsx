import { getCareerOpportunity } from 'career/api';
import { ICareerOpportunity } from 'career/models/Career';
import { CareerContext, ICareerContextState } from 'career/providers/CareerProvider';
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
  public static contextType = CareerContext;
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
    const storedJob = this.findStoredJob();
    return job ? (
      <InfoBox {...job} />
    ) : storedJob ? (
      <InfoBox {...storedJob} />
    ) : (
      <HttpError code={404} text="Denne karrieremuligheten eksisterer ikke." />
    );
  }

  private findStoredJob(): ICareerOpportunity | undefined {
    const { jobs }: ICareerContextState = this.context;
    const id = parseInt(this.props.match.params.id, 10);
    return jobs.find((j) => j.id === id);
  }
}

export default DetailView;
