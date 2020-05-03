import React, { FC } from 'react';

import Heading from 'common/components/Heading';

import { CompanyResults } from './CompanyResults';
import { NextPageObserver } from './NextPageObserver';
import { SearchBar } from './SearchBar';

import style from './CompanyList.less';

import { md } from 'common/components/Markdown';

const ABOUT_COMPANIES = md`
  Online har kontakt med mange bedrifter, og hver kan du finne din drømmebedrift.
  Finn ut hva de forskjellige bedriftene arbeider med, hvor de holder til og hvordan du kna kontakte dem.
  Se gjennom bedrifters kommende og tidligere arrangementer, eller se finn jobbannonser som passer for deg.

  Mangler det informasjon om en bedrift, eller har du ønsker om hvilke bedrifter vi skal samarbeide med?
  Meld interesse i [interesseskjemaet](bedriftsinteresse.online.ntnu.no) eller ta kontakt med Bedriftskomiteen på <bedkom@online.ntnu.no>!
`;

export const CompanyList: FC = () => {
  return (
    <section>
      <Heading title="Bedrifter" />
      <div className={style.intro}>{ABOUT_COMPANIES}</div>
      <SearchBar />
      <CompanyResults />
      <NextPageObserver />
    </section>
  );
};
