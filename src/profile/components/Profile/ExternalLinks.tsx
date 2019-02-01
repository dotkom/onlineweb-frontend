import React, { useContext } from 'react';

import { Content, Pane } from 'common/components/Panes';
import { ProfilePageContext } from 'profile/providers/ProfilePage';
import Link from './Link';

export const ExternalLinks = () => {
  const { github, linkedin, website } = useContext(ProfilePageContext);
  return (
    <Pane>
      <Content title="Eksterne sider">
        <Link k="Github" v={github} />
        <Link k="Linkedin" v={linkedin} />
        <Link k="Hjemmeside" v={website} />
      </Content>
    </Pane>
  );
};
