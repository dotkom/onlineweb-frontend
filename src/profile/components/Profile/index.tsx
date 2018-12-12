import { UserContext } from 'authentication/providers/UserProvider';
import { Page } from 'common/components/Panes';
import { IProfileProps } from 'profile';
import { getProfile } from 'profile/api';
import React, { ContextType } from 'react';
import { IFullProfileUser } from '../../models/User';
import { MainProfile } from './MainProfile';
import style from './profile.less';

export interface IProps extends IProfileProps {}

export interface IState {
  user?: IFullProfileUser;
}

class Profile extends React.Component<IProps, IState> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;
  public state: IState = {};

  public async componentDidMount() {
    const auth = this.context;
    if (auth.user) {
      const user = await getProfile(auth.user);
      this.setState({ user });
    }
  }

  public render() {
    const { user } = this.state;
    return (
      <div className={style.profileContainer}>
        <Page loading={!user}>{!!user ? <MainProfile user={user} /> : null}</Page>
      </div>
    );
  }
}

export default Profile;
