import React, { useContext } from 'react';

import Markdown from 'common/components/Markdown';
import { Content, Pane } from 'common/components/Panes';
import { UserProfileContext } from 'profile/providers/UserProfile';

export const Bio = () => {
  const { user } = useContext(UserProfileContext);
  if (!user || user.bio.length === 0) {
    return null;
  }
  return (
    <Pane>
      <Content title="Bio">
        <Markdown source={user.bio} />
      </Content>
    </Pane>
  );
};
