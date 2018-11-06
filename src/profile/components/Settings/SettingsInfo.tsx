import React from 'react';
import Markdown from 'common/components/Markdown';

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
