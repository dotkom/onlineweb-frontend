import { retrieveCareerOpportunity } from 'career/api';
import { ICareerOpportunity } from 'career/models/Career';
import { CareerContext } from 'career/providers/CareerProvider';
import HttpError from 'core/components/errors/HttpError';
import React, { Component, ContextType } from 'react';
import InfoBox from '../components/JobDetails';

export interface IProps {
  opportunityId: number;
}

export interface IState {
  job: ICareerOpportunity | undefined;
}

class DetailView extends Component<IProps, IState> {
  public static contextType = CareerContext;
  public context!: ContextType<typeof CareerContext>;
  public state: IState = {
    job: undefined,
  };

  public async componentDidMount() {
    window.scrollTo(0, 0);
    const id = this.props.opportunityId;
    const response = await retrieveCareerOpportunity(id);
    if (response.status === 'success') {
      this.setState({ job: response.data });
    }
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
    const { jobs } = this.context;
    const id = this.props.opportunityId;
    return jobs.find((j) => j.id === id);
  }
}

export default DetailView;
