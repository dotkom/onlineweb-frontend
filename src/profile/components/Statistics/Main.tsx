import Markdown from 'common/components/Markdown';
import { FourSplitPane, Page, Pane, SplitPane } from 'common/components/Panes';
import { Link } from 'core/components/Router';
import React from 'react';
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
          <Link href={`/profile/statistics/orders`}>
            <a>
              <Pane>
                <StringStat name="" value="Kiosk" />
              </Pane>
            </a>
          </Link>
          <Link href={`/profile/statistics/events`}>
            <a>
              <Pane>
                <StringStat name="" value="Arrangementer" />
              </Pane>
            </a>
          </Link>
        </FourSplitPane>
      </SplitPane>
    </Page>
  );
};

export default Main;
