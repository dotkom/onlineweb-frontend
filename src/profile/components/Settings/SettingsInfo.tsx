import Markdown from 'common/components/Markdown';
import { Pane } from 'common/components/Panes';
import React from 'react';

const MAIN_INFO_TEXT = `
  # Innstillinger

  På denne siden kan du finne innstillinger og informasjon knyttet til profilen din.
`;

const SettingsInfo = () => (
  <Pane>
    <Markdown source={MAIN_INFO_TEXT} />
  </Pane>
);

export default SettingsInfo;
