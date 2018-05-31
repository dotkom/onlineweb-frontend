import React,  { Component, Fragment } from 'react';
import { getResources } from '../api';
import { IResource } from '../models/Resource';
import Resource from './Resource';

export interface IResourceListState {
  resources: IResource[];
};

export default class ResourceList extends Component<{}, IResourceListState> {
  readonly state = { resources: [] } as IResourceListState;

  async componentDidMount() {
    const { results } = await getResources();
    this.setState({ resources: results });
  };

  render() {
    const { resources } = this.state;
    return(
      <Fragment>
        {this.state.resources.map((resource, index) => {
          return index % 2 === 0 ? 
            <div className="row" key={resource.title + resources[index].title}>
              <Resource {...resource} />
              <Resource {...resources[index + 1]} />
            </div> : undefined
        })}
      </Fragment>
    );
  };
};
