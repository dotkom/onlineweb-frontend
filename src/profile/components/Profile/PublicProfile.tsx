import React, { Component } from 'react';

import { Page } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';
import { getPublicProfile } from 'profile/api/search';
import { IPublicProfile } from 'profile/models/User';
import { ProfilePageProvider } from 'profile/providers/ProfilePage';
import { MainProfile } from './MainProfile';

interface IProps {
  profileId: number;
}

interface IState {
  profile?: IPublicProfile;
}

export class PublicProfile extends Component<IProps> {
  public state: IState = {};

  public init = async () => {
    const { profileId } = this.props;
    const profile = await getPublicProfile(profileId);
    this.setState({ profile });
  };

  public async componentDidMount() {
    this.init();
  }

  public render() {
    const { profile } = this.state;
    return profile ? (
      <Page>
        <ProfilePageProvider profile={profile}>
          <MainProfile />
        </ProfilePageProvider>
      </Page>
    ) : (
      <Spinner />
    );
  }
}
