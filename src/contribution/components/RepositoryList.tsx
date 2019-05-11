import React, { Component } from 'react';
import { getRepositories } from '../api/repositories';
import Repository from '../components/Repository';
import style from '../less/contribution.less';
import { IRepository } from '../models/Repository';

export interface IRepositoryListState {
  repositories: IRepository[];
}

export default class RepositoryList extends Component<{}, IRepositoryListState> {
  public readonly state: IRepositoryListState = { repositories: [] };

  public async componentDidMount() {
    const data = await getRepositories();
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
