import React, { useContext } from 'react';

import { Content, Pane } from 'common/components/Panes';
import { UserProfileContext } from 'profile/providers/UserProfile';
import Link from './Link';

export const ExternalLinks = () => {
  const { user } = useContext(UserProfileContext);
  if (!user) {
    return null;
  }
  return (
    <Pane>
      <Content title="Eksterne sider">
        <Link k="Github" v={user.github} />
        <Link k="Linkedin" v={user.linkedin} />
        <Link k="Hjemmeside" v={user.website} />
      </Content>
    </Pane>
  );
};
