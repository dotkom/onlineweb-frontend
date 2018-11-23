import { IProfileProps } from 'profile';
import React from 'react';
import { IFullProfileUser } from '../../models/User';
import Header from './Header';
import Link from './Link';
import MedalsView from './MedalsView';
import style from './profile.less';
import Progress from './Progress';

import { Content, Page, Pane, SplitPane } from 'common/components/Panes';
import KeyValue from './KeyValue';

export interface IProps extends IProfileProps {}

export interface IState {
  user?: IFullProfileUser;
}

class Profile extends React.Component<IProps, IState> {

  /*async componentDidMount() {
    const user = await getProfile();
    this.setState({ user });
  }*/

  public render() {
    const { user } = this.state;
    return (
      <div className={style.profileContainer}>
        <Page>
          <Header name={`${user.first_name} ${user.last_name}`} />
          <SplitPane>
            <Pane>
              <Content title="Kontakt">
                <KeyValue k="Telefon" v={user.phone_number} />
                <KeyValue k="E-post" v={user.email} />
                <KeyValue k="Komité-e-post" v={`${user.online_mail}@online.ntnu.no`} />
              </Content>
            </Pane>
            <Pane>
              <Content title="Studie">
                <div className={style.studyText}>
                  <KeyValue k="Klassetrinn" v={`${user.year}. Klasse`} />
                  <KeyValue k="Startår" v="2015" />
                </div>
                <Progress ongoingYear={user.year} completedYear={user.year - 1} />
              </Content>
            </Pane>
          </SplitPane>
          <Pane>
            <Content title="Komitéverv">
              <MedalsView medals={user.positions} />
            </Content>
          </Pane>
          <SplitPane>
            <Pane>
              <Content title="Eksterne sider">
                <Link k="Github" v={user.github} />
                <Link k="Linkedin" v={user.linkedin} />
                <Link k="Hjemmeside" v={user.website} />
              </Content>
            </Pane>
          </SplitPane>
        </Page>
      </div>
    );
  }
}

export default Profile;
