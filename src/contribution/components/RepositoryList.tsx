import React, { Component } from 'react';
import { getRepositories } from '../api/repositories';
import Repository from '../components/Repository';
import style from '../less/contribution.less';
import { IRepository } from '../models/Repository';

export interface IRepositoryListState {
  repositories: IRepository[];
}

export default class RepositoryList extends Component<{}, IRepositoryListState> {
  public readonly state = { repositories: [] } as IRepositoryListState;

  public async componentDidMount() {
    const data: any = await getRepositories();
    this.setState({ repositories: data.results });
  }

  public render() {
    const { repositories } = this.state;
    return (
      <div className={style.repositoryList}>
        {repositories.map((repo) => (
          <Repository key={repo.id} {...repo} />
        ))}
      </div>
    );
  }
}
