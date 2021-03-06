import React, { Component } from 'react';
import { getResources } from '../api';
import { IResource } from '../models/Resource';
import Resource from './Resource';
import style from './resources.less';

export interface IResourceListState {
  resources: IResource[];
}

const sortResources = (a: IResource, b: IResource) => (a.priority || 0) - (b.priority || 0);
const filterResources = (resource: IResource) => resource.active;

export default class ResourceList extends Component<{}, IResourceListState> {
  public readonly state = { resources: [] } as IResourceListState;

  public async componentDidMount() {
    const { results } = await getResources();
    this.setState({ resources: results });
  }

  public render() {
    const { resources } = this.state;
    return (
      <div className={style.container}>
        {resources
          .filter(filterResources)
          .sort(sortResources)
          .map((resource) => (
            <Resource key={resource.title} resource={resource} />
          ))}
      </div>
    );
  }
}
