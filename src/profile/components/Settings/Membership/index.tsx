import React from 'react';

import { Pane } from 'common/components/Panes';
import { Button } from '@dotkomonline/design-system';
import MembersInfo from './Info';

const Membership = () => {
  return (
    <Pane>
      <MembersInfo></MembersInfo>
      <Button
        onClick={() => {
          window.open('https://old.online.ntnu.no/profile/membership/');
        }}
      >
        Medlemskap
      </Button>
    </Pane>
  );
};

export default Membership;
