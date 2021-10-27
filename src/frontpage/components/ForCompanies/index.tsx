import React, { FC } from 'react';
import Markdown from 'common/components/Markdown';
import Heading from 'common/components/Heading';
import styles from './companies.less';
import SalesBox from './sale-box';

const COMPANY_TEXT = `
# Er du en bedrift som er på jakt etter skarpe IT-studenter? Da vil vi gjerne høre fra deg! Les videre for å finne ut hva vi kan tilby.

Online er en linjeforening for Informatikkstudentene ved NTNU Gløshaugen.
Informatikkstudiet hører til Institutt for datateknologi og informatikk (IDI).
Dette innebærer blant annet å lære om utvikling, forbedring, evaluering og bruk av datasystemer.
For mer informasjon om studiet, se NTNU sine offisielle nettsider for [bachelor](https://www.ntnu.no/studier/bit) og [master](https://www.ntnu.no/studier/msit).

Linjeforeningen drives av frivillige, og har som formål å være en sosial og faglig ressurs for studentene, samt et bindeledd mellom studentene, universitetets institusjoner og næringslivet.
Linjeforeningen har gjennom flere år opparbeidet seg et repertoar av tjenester som vi tilbyr våre studenter.
I samarbeid med næringslivet tilbyr vi kurs og bedriftspresentasjoner for å gi studentene våre en bredere og dypere fagkunnskap samt et innblikk i hverdagen til aktuelle arbeidsplasser.

Send oss en forespørsel for å komme i kontakt. Vi gleder oss til å samarbeide med dere!

- [Send epost til bedriftskontakt](mailto:bedriftskontakt@online.ntnu.no)
- [Meld interesse gjennom interesseskjemaet](https://interesse.online.ntnu.no)

`;

const PROFILING = ['Bedriftspresentasjon', 'Annonse i Offline', 'Stillingsutlysning'];

const ACADEMIC = ['Kurs', 'Workshop'];

const ForCompanies: FC = () => {
  return (
    <div className={styles.container}>
      <Heading title="Bedrifter" />
      <div className={styles.content}>
        <Markdown source={COMPANY_TEXT} />
        <div className={styles.boxes}>
          <SalesBox title="Profilering" salePoints={PROFILING} />
          <SalesBox title="Faglig" salePoints={ACADEMIC} />
        </div>
      </div>
    </div>
  );
};

export default ForCompanies;
