import React from 'react';

import { useCollapse } from 'common/hooks/collapsible';

import { md } from 'common/components/Markdown';

import style from './penalties.less';

const RULES = md`
  # Prikkeregler

  ## Hva er en prikk?

  Det at du har aktive prikker innebærer at du vil måtte vente 24 timer etter ordinær påmeldingsstart for å melde deg på et arrangement. Hver prikk varer i 20 dager, dersom du får ny prikk og du allerede har en aktiv prikk blir de nye 20 dagene lagt til på slutten av virkeperioden til eksisterende prikk(er).
  Varigheten til prikker er fryst i ferier. Disse er definert fra 1. desember til 15. januar og 1. juni til 15. august. Dersom en prikk gis 15. mai vil altså denne prikken utløpe 20. august.
  Grunnen til at vi deler ut prikker er å sørge for at medlemmer følger reglene.

  ## Hva gir prikk?

  Dette er en kort punktliste. Unntak og videre forklaringer finner du lenger ned.

  - Å melde seg av etter avmeldingsfristen.
  - Å ikke møte opp på et arrangement man har plass på.
  - Å møte opp etter arrangementets start eller innslipp er ferdig.
  - Å ikke svare på tilbakemeldingsskjema innen tidsfristen.
  - Å ikke overholde betalingsfristen. Dette medfører i tillegg suspensjon fra alle Onlines arrangementer inntil betaling er gjennomført.
  

  Den ansvarlige komiteen kan også foreta en skjønnsmessig vurdering som gagner deltakeren.


  ## Avmelding

  - Ved sykdom eller andre ekstraordinære hendelser vil man ikke få prikk ved avmelding 5 timer før arrangementsstart.
  - Alle komiteer ønsker at du melder deg av arrangementer selv om du vet dette vil medføre prikk. Dette er slik at noen andre kan bli obs på plassen sin så tidlig som mulig.


  ## Venteliste

  - Hvis du står på venteliste kan du melde deg av helt til arrangementet starter.
  - Når du står på venteliste er du inneforstått med at du når som helst kan få plass på arrangementet og dermed er bundet til reglene for arrangementet på lik linje med andre påmeldte.


  ## Betaling

  - Ved manglende betaling suspenderes man fra alle Onlines arrangementer inntil betalingen er gjennomført.
  - Ved betalt arrangement, men manglende oppmøte, vil man ikke få tilbakebetalt dersom avmelding skjer etter frist. Dersom neste på venteliste er tilgjengelig kan dette gjøres unntak for.


  ## Oppførsel

  - Ved upassende oppførsel under et av Onlines arrangement vil du stå økonomisk ansvarlig for eventuelle skader, og i verste fall risikere utestengelse fra alle Onlines arrangement.


  ## Bedriftsarrangementer

  - Ved bedriftsarrangementer åpner dørene i henhold til starttid på arrangementet. Ti minutter etter at dørene åpner slippes oppmøte på ventelisten inn dersom det er plass. 15 minutter etter at dørene åpner stenger innslippet.
  - Det kreves at en deltaker svarer på den elektroniske tilbakemeldingen etter bedriftsarrangementer. Det vil komme e-post etter arrangementet med lenke til tilbakemeldingsskjema som må besvares innen denoppgitte fristen. Dersom en deltager ikke svarer innen fristen vil dette gi en prikk.


  ## Hvorfor har jeg fått prikk?

  Under “Instillinger” og “Prikker og suspensjoner” (https://online.ntnu.no/profile/settings/penalties) vil du kunne se prikkene dine, og eventuelle begrunnelser.

  Dersom du mener noe feil har skjedd, vennligst ta kontakt med arrangøren som står oppført på arrangementet. Kontaktinfo for arrangerende komité vises på arrangementssiden.
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
