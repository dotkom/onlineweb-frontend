import Markdown from 'common/components/Markdown';
import { FourSplitPane, Page, Pane, SplitPane } from 'common/components/Panes';
import { Link } from 'core/components/Router';
import React from 'react';
import { routes } from './';
import StringStat from './Events/StringStat';

const ABOUT_STATISTICS = `
  # Statistikk

  Her kan du se statistikk for forskjellige metrikker relatert til din bruker.

  _Denne statistikken vises kun for deg, og brukes ikke av Online på noen måte._
`;

const Main = () => {
  return (
    <Page>
      <Pane>
        <Markdown source={ABOUT_STATISTICS} />
      </Pane>
      <SplitPane>
        <FourSplitPane>
          <Link to={routes.orders}>
            <Pane>
              <StringStat name="" value="Kiosk" />
            </Pane>
          </Link>
          <Link to={routes.events}>
            <Pane>
              <StringStat name="" value="Arrangementer" />
            </Pane>
          </Link>
        </FourSplitPane>
      </SplitPane>
    </Page>
  );
};

export default Main;
