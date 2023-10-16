import React from 'react';
import { useRouter } from 'next/router';

import { useCollapse } from 'common/hooks/collapsible';

import { md } from 'common/components/Markdown';

import style from './penalties.less';

// prettier-ignore
const RULES = md`
  ## English below

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
  - Deltagere på bedriftsarrangementer skal delta på alle obligatoriske deler av arrangementet. For bedriftspresentasjon og kurs vil dette henholdsvis innebære selve presentasjonen og kursopplegget. De første 45 minuttene med påfølgende mingling regnes også som obligatorisk . Dersom en deltaker forlater den obligatoriske delen uten gyldig grunn vil dette medføre prikk.


  ## Hvorfor har jeg fått prikk?

  Under “Instillinger” og “Prikker og suspensjoner” (https://online.ntnu.no/profile/settings/penalties) vil du kunne se prikkene dine, og eventuelle begrunnelser.

  Dersom du mener noe feil har skjedd, vennligst ta kontakt med arrangøren som står oppført på arrangementet. Kontaktinfo for arrangerende komité vises på arrangementssiden.

  # Mark Rules
  
  ## What is a mark?
  
  Having active marks means that you will have to wait 24 hours after the regular registration start to sign up for an event. Each mark lasts for 20 days; if you get a new mark and you already have an active one, the new 20 days will be added at the end of the active period of the existing mark(s). The duration of marks is frozen during holidays. These are defined from December 1 to January 15 and June 1 to August 15. This means that if a mark is given on May 15, this mark will expire on August 20. The reason we distribute marks is to ensure that members follow the rules.
  
  ## What causes a mark?
  
  This is a brief bullet list. Exceptions and further explanations can be found below.
  
  - Unregistering after the deregistration deadline.
  - Not showing up for an event you have a spot at.
  - Arriving after the start of the event or after admission is over.
  - Not responding to the feedback form within the deadline.
  - Not adhering to the payment deadline. This also results in suspension from all Online's events until payment is completed.
  
  The responsible committee can also make a discretionary assessment that benefits the participant.
  
  ## Cancellation
  
  - In case of illness or other extraordinary events, you will not receive a mark if you unregister 5 hours before the start of the event.
  - All committees wish that you unregister from events even if you know this will result in a mark. This is so that someone else can become aware of their spot as early as possible.
  
  ## Waiting List
  
  - If you are on the waiting list, you can unregister right up to the start of the event.
  - When you're on the waiting list, you understand that you can get a spot in the event at any time and are thus bound by the event rules just like other registered participants.
  
  ## Payment
  
  - In case of non-payment, you are suspended from all Online's events until the payment is completed.
  - For paid events, but no show-up, you will not be refunded if deregistration happens after the deadline. If the next person on the waiting list is available, exceptions can be made.
  
  ## Behavior
  
  - If inappropriate behavior occurs during one of Online's events, you will be financially responsible for any damages and might risk being banned from all of Online's events.
  
  ## Corporate Events
  
  - For corporate events, the doors open according to the start time of the event. Ten minutes after the doors open, attendees on the waiting list are admitted if there is space. Admission closes 15 minutes after the doors open.
  - Participants at corporate events are required to respond to the electronic feedback after the events. An email will be sent after the event with a link to the feedback form that must be answered within the given deadline. If a participant does not respond within the deadline, this will result in a mark.
  - Participants at corporate events must attend all mandatory parts of the event. For company presentations and courses, this means the presentation itself and the course setup. The first 45 minutes followed by mingling are also considered mandatory. If a participant leaves the mandatory part without a valid reason, this will result in a mark.
  
  ## Why did I receive a mark?
  
  Under "Settings" and "Marks and Suspensions" (https://online.ntnu.no/profile/settings/penalties) you can view your marks and any reasons.
  
  If you believe there has been a mistake, please contact the organizer listed for the event. Contact information for the organizing committee is displayed on the event page.
`;

export const Info = () => {
  const rulesId = 'rules';

  const { asPath } = useRouter();
  const hash = asPath.split('#')[1];

  const [collapsed, toggleCollapse] = useCollapse(hash !== rulesId);

  return (
    <>
      <h2>Regler</h2>
      <button className={style.toggleRules} onClick={toggleCollapse}>
        {collapsed ? 'Vis regler' : 'Skjul regler'}
      </button>
      {!collapsed && (
        <div id={rulesId} className={style.rules}>
          {RULES}
        </div>
      )}
    </>
  );
};

export default Info;
