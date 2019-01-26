import React from 'react';

import { logIn } from 'authentication/api';
import Markdown from 'common/components/Markdown';
import { Page, Pane } from 'common/components/Panes';

import { Lock } from './Lock';
import style from './notAuthenticated.less';

const ABOUT_NOT_AUTHENTICATED = `
  # 401: Ikke logget inn

  #### Vennligst logg inn inn for å se innholdet på denne siden
`;

export const NotAuthenticated = () => {
  return (
    <Page>
      <Pane>
        <div className={style.container}>
          <Markdown source={ABOUT_NOT_AUTHENTICATED} />
          <div className={style.icon}>
            <Lock />
          </div>
          <button onClick={logIn} title="Logg inn">
            Logg inn
          </button>
        </div>
      </Pane>
    </Page>
  );
};
