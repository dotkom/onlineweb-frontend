import React, { useContext } from 'react';

import Markdown from 'common/components/Markdown';
import { Content, Pane } from 'common/components/Panes';
import { ProfilePageContext } from 'profile/providers/ProfilePage';

export const Bio = () => {
  const { bio } = useContext(ProfilePageContext);
  return bio.length ? (
    <Pane>
      <Content title="Bio">
        <Markdown source={bio} />
      </Content>
    </Pane>
  ) : null;
};
