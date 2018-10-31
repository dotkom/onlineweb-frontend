import React, { Component } from 'react';
import { getRepositories } from '../api/github';
import { IRepository } from '../models/Repository';
import style from '../less/contribution.less';
import Repository from '../components/Repository';
import {DateTime} from 'luxon';

export interface IRepositoryListState {
    repositories: IRepository[];
}

export default class RepositoryList extends Component<{}, IRepositoryListState> {
    public readonly state = { repositories: [] } as IRepositoryListState;

    public async componentDidMount() {
        const latest_repos: IRepository[] = [];
        const results = await getRepositories();

        results.map((repo: IRepository) => {
            /* sort out repos recently updated (within 2 years) */
            if (DateTime.fromISO(repo.updated_at).year > (DateTime.local().year - 2)) {
                latest_repos.push(repo);
            }
        });

        this.setState({ repositories: latest_repos });
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
