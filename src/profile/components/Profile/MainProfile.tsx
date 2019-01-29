import React, { useContext } from 'react';

import { Content, Pane, SplitPane } from 'common/components/Panes';
import { IFullProfileUser } from 'profile/models/User';
import { UserProfileContext } from 'profile/providers/UserProfile';

import { Bio } from './Bio';
import { ExternalLinks } from './ExternalLinks';
import Header from './Header';
import KeyValue from './KeyValue';
import MedalsView from './MedalsView';
import { Study } from './Study';

const committeeMail = (mail: string) => (mail ? `${mail}@online.ntnu.no` : null);

export const MainProfile = () => {
  const { user } = useContext(UserProfileContext) as { user: IFullProfileUser };
  return (
    <>
      <Header />
      <SplitPane>
        <Pane>
          <Content title="Kontakt">
            <KeyValue k="Telefon" v={user.phone_number} />
            <KeyValue k="E-post" v={user.email} />
            <KeyValue k="Komité-e-post" v={committeeMail(user.online_mail)} />
          </Content>
        </Pane>
        <Study />
      </SplitPane>
      <Bio />
      <Pane>
        <Content title="Komitéverv">
          <MedalsView medals={user.positions} />
        </Content>
      </Pane>
      <SplitPane>
        <ExternalLinks />
      </SplitPane>
    </>
  );
};
