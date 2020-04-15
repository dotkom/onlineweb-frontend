import React from 'react';

import Markdown from 'common/components/Markdown';
import { FourSplitPane, Page, Pane, SplitPane } from 'common/components/Panes';
import { getProfileStatisticsEventsUrl, getProfileStatisticsOrdersUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';

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
          <Link {...getProfileStatisticsOrdersUrl()}>
            <a>
              <Pane>
                <StringStat name="" value="Kiosk" />
              </Pane>
            </a>
          </Link>
          <Link {...getProfileStatisticsEventsUrl()}>
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
