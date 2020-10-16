import React from 'react';
import Markdown from 'common/components/Markdown';
import Link from 'next/link';
import { Pane } from 'common/components/Panes';
import { Button } from '@dotkomonline/design-system';

const ABOUT_PROFILE_MEMBERSHIP = `
  # Medlemskap

  Du trenger medlemskap for å kunne melde deg på linje-spesifikke arrangementer.

  For å søke medlemskap, bruk knappen under
`;

const Membership = () => {
  return (
    <Pane>
      <Markdown source={ABOUT_PROFILE_MEMBERSHIP} />

      <Link href="https://old.online.ntnu.no/profile/membership/" passHref={true}>
        <Button>Medlemskap</Button>
      </Link>
    </Pane>
  );
};

export default Membership;
