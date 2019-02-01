import React from 'react';

import { useCollapse } from 'common/hooks/collapsible';

import { md } from 'common/components/Markdown';

import style from './penalties.less';

const RULES = md`
  ### Prikk?

  Det at du har aktive prikker innebærer at du vil måtte vente 24 timer etter ordinær påmeldingsstart for å melde
  deg på et arrangement. Hver prikk varer i 30 dager, dersom du får ny prikk og du allerede har en aktiv prikk blir
  de nye 30 dagene lagt til på slutten av virkeperioden til eksisterende prikk(er).

  Varigheten til prikker er fryst i ferier. Disse er definert fra 1. desember til 15. januar og 1. juni til 15.
  august. Dersom en prikk gis 15. mai vil altså denne prikken utløpe 30. august.

  Grunnen til at vi deler ut prikker er å sørge for at medlemmer følger reglene.

  ### Generelle regler:

  Det kreves at en møter opp ved påmelding til et arrangement. Dersom du må melde deg av etter avmeldingsfristen har
  gått ut, sender du en mail til den ansvarlige komiteen og melder frafall slik at vi kan gi plassen din videre. Du
  vil få prikk så lenge avmeldingsfristen er ute.

  Hvis du står på venteliste kan du melde deg av helt til arrangementet starter. Når du står på venteliste er du
  inneforstått med at du når som helst kan få plass på arrangementet og dermed er bundet til reglene for
  arrangementet på lik linje med andre påmeldte.

  Ved upassende oppførsel under et av Onlines arrangement vil du stå økonomisk ansvarlig for eventuelle skader, og i
  verste fall risikere utestengelse fra alle Onlines arrangement.

  Dersom det oppstår noe uforutsett under et arrangment forventes det at man tar kontakt med de ansvarlige for
  arrangementet. Hvis du ikke varsler, og dette medfører store problemer for arrangøren, får man en prikk.

  ### Sosiale arrangement

  Betalingsfrister skal overholdes. Man får en prikk for betaling etter fristen, og utestenging fra alle arrangement
  fram til man har betalt det utestående beløpet.

  Hvis man er påmeldt et betalingsarrangement, og har betalt, er det ikke mulighet for å få tilbakebetalt pengene
  etter betalingsfristen. Unntak for dette vil være om det er personer på ventelisten. Da kan vi kontakte disse for
  å ta over plassen og betalingen. Dette må avtales med komiteen som har ansvar for betalingsarrangementet. Man får
  en prikk som vanlig når man melder seg av for sent.

  ### Bedriftspresentasjoner og kurs

  Ved frafall etter avmeldingsfristen pga sykdom må dette meldes til den ansvarlige komiteen senest samme dag som
  kurset/bedriftspresentasjonen kl.12.00. Avbud senere enn dette vil gi en prikk. Ved kurs og bedriftspresentasjon
  åpner dørene i henhold til starttid på arrangementet. Venteliste åpner ti minutter etter at dørene åpner. 15
  minutter etter at dørene åpner stenger innslippet.

  Når ventelisten åpner slippes folk inn i den rekkefølgen de er påmeldt. Alle som kommer etter dette havner bakerst
  i køen, uavhengig om du er påmeldt eller står på venteliste.

  Dersom du kommer etter at ventelisten har åpnet, og arrangementet er fullt, vil du få en prikk. Det kreves at en
  deltager svarer på den elektroniske tilbakemeldingen etter bedriftspresentasjon og kurs. Det vil komme epost dagen
  etter presentasjonen med lenke til tilbakemeldingsskjema som må besvares innen noen få dager (frist er oppgitt i
  eposten). Om en deltager ikke svarer innen fristen vil dette gi en prikk.

  ### Hvorfor har jeg fått en prikk?

  På toppen av denne siden vil du kunne se grunnen til prikkene dine. Om de ikke vises kan du ta kontakt med de
  respektive komiteene.

  - For sosiale arrangementer, kontakt [Arrkom](mailto:arrkom@online.ntnu.no).
  - For bedriftspresentasjoner, kontakt [Bedkom](mailto:bedkom@online.ntnu.no).
  - For kurs, kontakt [Fagkom](mailto:fagkom@online.ntnu.no).
  - For generelle henvendelser, kontakt [Hovedstyret](mailto:hovedstyret@online.ntnu.no).

  **Ved upassende oppførsel under et av Onlines arrangement vil du stå økonomisk ansvarlig for eventuelle skader, og i verste fall risikere utestengelse fra _alle_ Onlines arrangement**
`;

export const Info = () => {
  const [collapsed, toggleCollapse] = useCollapse();
  return (
    <>
      <h2>Regler</h2>
      <button className={style.toggleRules} onClick={toggleCollapse}>
        {collapsed ? 'Vis regler' : 'Skjul regler'}
      </button>
      {!collapsed && <div className={style.rules}>{RULES}</div>}
    </>
  );
};

export default Info;
