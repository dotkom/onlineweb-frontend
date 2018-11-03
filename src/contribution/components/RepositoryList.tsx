import React, { Component } from 'react';
import { getRepositories } from '../api/repositories';
import { IRepository } from '../models/Repository';
import style from '../less/contribution.less';
import Repository from '../components/Repository';

export interface IRepositoryListState {
    repositories: IRepository[];
}

export default class RepositoryList extends Component<{}, IRepositoryListState> {
    public readonly state = { repositories: [] } as IRepositoryListState;

    public async componentDidMount() {
        const results = await getRepositories();
        this.setState({ repositories: results });
    }

    public render() {
        const { repositories } = this.state;
        return(
            <div className={style.container}>
                { repositories.map((repo) => (
                    <Repository key={repo.id} {...repo} />
                )) }
            </div>
        );
    }
}
