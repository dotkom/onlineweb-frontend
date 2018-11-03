import React from 'react';
import Header from './Header';
import Name from './Name';
import MedalsView from './MedalsView';
import Info from './Info';
import Progress from './Progress';
import IconInfo from './IconInfo';
import InfoGroup from './InfoGroup';
import { IFullProfileUser } from '../../models/User';
import { getProfile } from '../../api';
import style from '../../less/profile.less';
import { IProfileProps } from 'profile';

export interface IProps extends IProfileProps {
}

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
      <div>
        <Header />
        <Name name={`${user.first_name} ${user.last_name}`} />
        <div className={style.center}>
          <div className={style.innerContainer}>
            <InfoGroup name="Navn" icon="names">
              <Info type="NTNU Brukernavn" content={user.ntnu_username}/>
              <Info type="Kallenavn" content={user.kallenavn}/>
              <Info type="Brukernavn" content={user.username}/>
            </InfoGroup>
            <Progress ongoingYear={user.grade} completedYear={user.grade - 1} name="Studieprogresjon" />
            <InfoGroup name="Kontakt" icon="contact">
              <Info type="Primær e-post" content={user.primary_email}/>
              <Info type="Online e-post" content={`${user.gsuite_username}@online.ntnu.no`}/>
              <Info type="Telefonnummer" content={user.phone_number}/>
              <Info type="Adresse" content={user.address}/>
            </InfoGroup>
            <MedalsView medals={user.committees} name="Komitéverv" />
            <InfoGroup name="Eksterne Lenker" icon="external">
              <IconInfo type="Github" content={user.external.github} />
              <IconInfo type="Linkedin" content={user.external.linkedin} />
              <IconInfo type="Hjemmeside" content={user.external.homepage} />
            </InfoGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
