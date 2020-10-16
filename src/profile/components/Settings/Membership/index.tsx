import React from 'react';

import { Pane } from 'common/components/Panes';
import { Button } from '@dotkomonline/design-system';
import MembersInfo from './Info';

function openTab() {
  window.open('https://old.online.ntnu.no/profile/membership/');
}

const Membership = () => {
  return (
    <Pane>
      <MembersInfo></MembersInfo>
      <Button onClick={openTab}>Medlemskap</Button>
    </Pane>
  );
};

export default Membership;
