import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Header from './Header';
import Name from './Name';
import MedalsView from './MedalsView';
import Infogroup from './InfoGroup';
import Info from './Info';
import Progress from './Progress';
import IconInfo from './IconInfo';
import InfoGroup from './InfoGroup';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
        user: {
          first_name: 'Ole Anders',
          last_name: 'Stokker',
          username: 'frozenlight',
          ntnu_username: 'oleast',
          kallenavn: 'oleast',
          grade: 3,
          primary_email: 'oleast@stud.ntnu.no',
          gsuite_username: 'ole.anders.stokker',
          phone_number: '47684466',
          address: 'Odd Brochmanns Veg 57',
          committees: [
            { committee: 'dotkom', position: 'medlem', range: '2015-2018' },
            { committee: 'dotkom', position: 'nestleder', range: '2018-2019' },
            { committee: 'hovedstyret', position: 'leder', range: '2038-0001' },
            { committee: 'prokom', position: 'redaktør', range: '2015-2018' },
          ],
          external: {
            github: 'https://github.com/oleast',
            linkedin: 'https://linkedin.com/in/oleast',
            homepage: 'https://stokkers.no'
          }

        }
    };

    this.API_URL = '/api/v1/users?format=json';
  }

  componentDidMount() {
    fetch(this.API_URL, { credentials: 'same-origin' })
        .then(response => response.json())
        .then(data => this.setState({user: data.results[1]}));
  }

  render() {
    const { user } = this.state;
    return (
      <Grid>
        <Header />
        <Name name={`${user.first_name} ${user.last_name}`} />
        <div>
          <InfoGroup name="Navn" icon="names">
            <Info type="NTNU Brukernavn" content={user.ntnu_username}/>
            <Info type="Kallenavn" content={user.kallenavn}/>
            <Info type="Brukernavn" content={user.username}/>
          </InfoGroup>
          <InfoGroup name="Studieprogresjon" icon="progress">
            <Progress ongoingYear={user.grade} completedYear={user.grade - 1} />
          </InfoGroup>
          <InfoGroup name="Kontakt" icon="contact">
            <Info type="Primær e-post" content={user.primary_email}/>
            <Info type="Online e-post" content={`${user.gsuite_username}@online.ntnu.no`}/>
            <Info type="Telefonnummer" content={user.phone_number}/>
            <Info type="Adresse" content={user.address}/>
          </InfoGroup>
          <InfoGroup name="Komitéverv" icon="medal">
            <MedalsView medals={user.committees} />
          </InfoGroup>
          <InfoGroup name="Eksterne Lenker" icon="external">
            <IconInfo type="Github" content={user.external.github} />
            <IconInfo type="Linkedin" content={user.external.linkedin} />
            <IconInfo type="Hjemmeside" content={user.external.homepage} />
          </InfoGroup>
        </div>
      </Grid>
    );
  }
}

export default Profile;
