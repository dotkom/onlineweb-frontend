import React, { useContext } from 'react';

import { Content, Pane, SplitPane } from 'common/components/Panes';
import { ProfilePageContext } from 'profile/providers/ProfilePage';

import { Bio } from './Bio';
import { ExternalLinks } from './ExternalLinks';
import Header from './Header';
import KeyValue from './KeyValue';
import MedalsView from './MedalsView';
import { Study } from './Study';

const committeeMail = (mail: string | null) => (mail ? `${mail}@online.ntnu.no` : null);

export const MainProfile = () => {
  const profile = useContext(ProfilePageContext);
  return (
    <>
      <Header />
      <SplitPane>
        <Pane>
          <Content title="Kontakt">
            <KeyValue k="Telefon" v={profile.phone_number} />
            <KeyValue k="E-post" v={profile.email} />
            <KeyValue k="Komité-e-post" v={committeeMail(profile.online_mail)} />
          </Content>
        </Pane>
        <Study />
      </SplitPane>
      <Bio />
      <Pane>
        <Content title="Komitéverv">
          <MedalsView medals={profile.positions} />
        </Content>
      </Pane>
      <SplitPane>
        <ExternalLinks />
      </SplitPane>
    </>
  );
};
