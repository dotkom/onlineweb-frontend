import Markdown from 'common/components/Markdown';
import React from 'react';

const ABOUT_PROFILE_PRIVACY = `
  # Personvern

  Her kan du endre personvernsinstillingene koblet til profilen din.
`;

export const Info = () => <Markdown source={ABOUT_PROFILE_PRIVACY} />;

export default Info;
