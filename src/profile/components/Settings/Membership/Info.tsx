import Markdown from 'common/components/Markdown';
import React from 'react';

const ABOUT_PROFILE_MEMBERSHIP = `
  # Medlemskap

  Du trenger medlemskap for å kunne melde deg på linje-spesifikke arrangementer.

  For å søke medlemskap, bruk knappen under
`;


const MembersInfo = () => (
    <Markdown source={ABOUT_PROFILE_MEMBERSHIP} />
);

export default MembersInfo;
