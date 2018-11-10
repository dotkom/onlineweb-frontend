import { IProfileProps } from 'profile';
import React from 'react';
import style from '../../less/profile.less';
import { getProfile } from '../../api';
import { IFullProfileUser } from '../../models/User';
import Header from './Header';
import IconInfo from './IconInfo';
import Info from './Info';
import InfoGroup from './InfoGroup';
import MedalsView from './MedalsView';
import Progress from './Progress';

import { Content, FourSplitPane, Page, Pane, SplitPane } from 'common/components/Panes';
import KeyValue from './KeyValue';

export interface IProps extends IProfileProps {}

export interface IState {
  user: IFullProfileUser;
}

class Profile extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      user: {
        first_name: 'Kari',
        last_name: 'Nordmann',
        username: 'dragonslayer',
        ntnu_username: 'karinor',
        kallenavn: 'javaGuru',
        grade: 3,
        primary_email: 'karinor@stud.ntnu.no',
        gsuite_username: 'kari.nordmann',
        phone_number: '98765432',
        address: 'Høgskoleringen 3 (R.I.P)',
        committees: [
          { committee: 'dotkom', position: 'medlem', range: '2015-2018' },
          { committee: 'dotkom', position: 'nestleder', range: '2018-2019' },
          { committee: 'hovedstyret', position: 'leder', range: '2038-0001' },
          { committee: 'prokom', position: 'redaktør', range: '2015-2018' },
        ],
        external: {
          github: 'https://github.com/karinor',
          linkedin: 'https://linkedin.com/in/karinor',
          homepage: 'https://kari.nordmann.no',
        },
      },
    };
  }

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
                <KeyValue k="E-post" v={user.primary_email} />
                <KeyValue k="Komité-e-post" v={`${user.gsuite_username}@online.ntnu.no`} />
              </Content>
            </Pane>
            <Pane>
              <Content title="Studie">
                <div className={style.studyText}>
                  <KeyValue k="Klassetrinn" v={`${user.grade}. Klasse`} />
                  <KeyValue k="Startår" v="2015" />
                </div>
                <Progress ongoingYear={user.grade} completedYear={user.grade-1} />
              </Content>
            </Pane>
          </SplitPane>
          <Pane>
            <Content title="Komitéverv">
              <MedalsView medals={user.committees} />
            </Content>
          </Pane>
          <SplitPane>
            <Pane>
              <Content title="Eksterne sider">
                <KeyValue k="Github" v={user.external.github} />
                <KeyValue k="Linkedin" v={user.external.linkedin} />
                <KeyValue k="Hjemmeside" v={user.external.homepage} />
              </Content>
            </Pane>
          </SplitPane>
        </Page>
      </div>
    );
  }
}

export default Profile;
