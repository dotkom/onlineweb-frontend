import React from 'react';
import InfoBox from '../components/InfoOnOpportunity';
import { IJob } from '../models/Job';
import HttpError from 'core/components/errors/HttpError';

export interface IDetailViewProps {
  match: { params: { id: string } };
  jobs: IJob[];
}

class DetailView extends React.Component<IDetailViewProps, IDetailViewProps> {
  private id: number;
  private job: IJob | undefined;
  constructor(props: IDetailViewProps) {
    super(props);
    this.id = parseInt(props.match.params.id, 10);
    this.job = props.jobs.find(j => j.id === this.id);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps: IDetailViewProps) {
    this.id = parseInt(nextProps.match.params.id, 10);
    this.job = nextProps.jobs.find(j => j.id === this.id);
  }

  render() {
    return this.job ? <InfoBox {...this.job} /> : <HttpError code={404} text="Denne karrieremuligheten eksisterer ikke." />;
  }
};

export default DetailView;
