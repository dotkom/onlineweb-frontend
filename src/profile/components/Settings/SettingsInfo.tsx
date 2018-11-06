import Markdown from 'common/components/Markdown';
import React from 'react';

const MAIN_INFO_TEXT = `
  # Innstillinger

  På denne siden kan du finne innstillinger og informasjon knyttet til profilen din.
`;

const SettingsInfo = () => (
  <div>
    <Markdown source={MAIN_INFO_TEXT} />
  </div>
);

export default SettingsInfo;
