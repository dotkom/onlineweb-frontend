import React from 'react';
import { useRouter } from 'next/router';

import { useCollapse } from 'common/hooks/collapsible';

import { md } from 'common/components/Markdown';

import style from './penalties.less';

// prettier-ignore
const RULES = md`
  **English below**

  # Prikkeregler


  ## Hva er en prikk?
  Prikker er et straffetiltak for å sikre at medlemmene av Online følger reglene. Det at du har aktive prikker innebærer at du vil måtte vente en viss periode etter ordinær påmeldingsstart for å melde deg på et arrangement. Hver prikk varer i 14 dager fra tidspunktet du får den.

  | Totalt antall prikker | Utsatt påmelding                        |
  |-----------------------|-----------------------------------------|
  | 1 prikk               | 1t                                      |
  | 2 prikker             | 4t                                      |
  | 3 prikker             | 24t                                     |
  | 6+ prikker            | Suspensasjon i 14 dager fra siste prikk |

  Prikker er overlappende. Dette betyr at dersom du får nye prikker når du allerede har aktive prikker fra en annen anledning, så vil disse prikkene plusses sammen. Hver anledning som har gitt deg prikker vil ha sin egen levetid før de ikke er aktive lenger.


  ### Eksempel
  Du får 2 prikker for å melde deg av et arrangement sent. Nå har du fire timers utsettelse på alle påmeldinger. Fire dager senere får du en ny prikk for å ikke ha sendt inn tilbakemeldingsskjema innen tidsfristen. Nå vil du i ti dager fremover ha totalt 3 aktive prikker og dermed ha 24 timers utsettelse på alle påmeldinger. Etter disse ti dagene vil de to første prikkene løpe ut og du vil da kun ha én aktiv prikk i fire dager. Dette medfører én times utsettelse på påmeldinger.

  Eksempelet visualisert:
  ![Eksempeldiagram](https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/xs/742bc241-0cc3-4389-97de-0e12c47e4e85.png)


  ### Ferier

  Varigheten til prikker er fryst i ferier. Disse er definert fra 5. desember til 10. januar og 1. juni til 15. august. Dersom en prikk gis 24. mai vil altså denne prikken utløpe 20. august.


  ## Hva gir prikker?

  Dette er en kort punktliste. Unntak og videre forklaringer finner du lenger ned.

  - Å melde seg av etter avmeldingsfristen inntil 2 timer før arrangementstart gir 2 prikker, etter dette gis det 3 prikker.
  - Å ikke møte opp på et arrangement man har plass på gir 3 prikker.
  - Å møte opp etter arrangementets start eller innslipp er ferdig gir i utgangspunktet 3 prikker. Her vil en skjønnsmessig vurdering bli foretatt ut fra hvor sent deltakeren ankom arrangementet.
  - Å ikke svare på tilbakemeldingsskjema innen tidsfristen gir 2 prikker.
  - Å ikke overholde betalingsfristen gir 1 prikk. Dette medfører i tillegg suspensjon fra alle Onlines arrangementer inntil betaling er gjennomført.

  Den ansvarlige komiteen kan også foreta en skjønnsmessig vurdering som gagner deltakeren.


  ## Avmelding

  - Ved sykdom eller andre ekstraordinære hendelser vil man ikke få prikk ved avmelding 5 timer før arrangementsstart. Etter dette gis prikker som normalt iht. punktene over.
  - Alle komiteer ønsker at du melder deg av arrangementer selv om du vet dette vil medføre prikker. Dette er slik at noen andre kan bli obs på plassen sin så tidlig som mulig.


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
  - Det kreves at en deltaker svarer på den elektroniske tilbakemeldingen etter bedriftsarrangementer. Det vil komme e-post etter arrangementet med lenke til tilbakemeldingsskjema som må besvares innen den oppgitte fristen. Dersom en deltaker ikke svarer innen fristen, vil dette gi to prikker.
  - Deltakere på bedriftsarrangementer skal delta på alle obligatoriske deler av arrangementet. For bedriftspresentasjon og kurs vil dette henholdsvis innebære selve presentasjonen og kursopplegget. De første 45 minuttene med påfølgende mingling regnes også som obligatorisk . Dersom en deltaker forlater den obligatoriske delen uten gyldig grunn vil dette medføre 2 prikker.


  ## Hvorfor har jeg fått prikk?

  Under “Instillinger” og “Prikker og suspensjoner” (https://online.ntnu.no/profile/settings/penalties) vil du kunne se prikkene dine, og eventuelle begrunnelser.

  Dersom du mener noe feil har skjedd, vennligst ta kontakt med arrangøren som står oppført på arrangementet. Kontaktinfo for arrangerende komité vises på arrangementssiden.


  ---


  **English**

  # Mark rules


  ## What is a mark?

  Marks are a punishment system that is designed to make sure that members of Online follows various rules. Having active marks means that you will have to wait a certain period longer than usual for event registrations. The lifetime of a mark is 14 days from the moment you receive it.

  | Totalt amount of marks | Delayed registration                                        |
  |------------------------|-------------------------------------------------------------|
  | 1 mark                 | 1h                                                          |
  | 2 marks                | 4h                                                          |
  | 3 marks                | 24h                                                         |
  | 6+ marks               | Suspension for 14 days from the time you got your last mark |

  Marks overlap. This means that if you were to receive any new marks while you already have active marks from another occasion, these marks will be summed together. Each unique occasion that ended up giving you an amount of marks will have their own lifespan before coming inactive.


  ### Example

  You receive 2 marks for cancelling your registartion for an event too late. You now have a four hour delay for all event registrations. Four days later you receive a new mark and this time its because you forgot to respond to a feedback form within its deadline. You will now have 3 active marks for a period of ten days in which you will have a 24 hour delayed registration for all events. After these ten days your first two marks will expire and become inactive leaving you with only 1 active mark for four days. In these four days you will only have a 1 hour delayed registration.

  The example visualized:
  ![Example diagram](https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/xs/742bc241-0cc3-4389-97de-0e12c47e4e85.png)


  ### Holidays

  The duration of marks are frozen during holidays. Holidays are defined to start december 5th until january 10th, and june 1st until the august 15th. If you receive a mark on the 24th of may your mark will expire august 20th.


  ## What causes a mark?

  This is a brief bullet list. Exceptions and further explanations can be found below.

  - Unregistering after the deregistration deadline up until 2 hours before the event start causes 2 marks. Any later than 2 hours before the start, 3 marks will be given.
  - Not showing up to an event you have registerered for causes 3 marks.
  - Showing up after the event start or after admission is finished will per definition give 3 marks. An assessment will be made and the amount of marks you are given may be dependent upon how late you showed up and how much of a disturbance the late arrival made to the specific event.
  - Not responding to the feedback form within the deadline will cause 2 marks.
  - Not adhering to the payment deadline will cause 1 mark. This also results in suspension from all of Online's events until payment is completed.

  The responsible committee can also make a discretionary assessment that benefits the participant.


  ## Deregistration

  - In case of illness or other extraordinary events, you will not receive a mark if you unregister 5 hours before the start of the event. Any later and marks will be given according to the rules above.
  - All committees wish that you unregister from events even if you know this will result in a mark. This is so that someone else can become aware of their spot as early as possible.


  ## Waiting List

  - If you are on the waiting list, you can unregister right up to the start of the event.
  - When you're on the waiting list, you understand that you can get a spot in the event at any time and are thus bound by the event rules just like other registered participants.


  ## Payment

  - In case of non-payment, you are suspended from all of Online's events until the payment is completed.
  - For paid events, but no show-up, you will not be refunded if deregistration happens after the deadline. If the next person on the waiting list is available, exceptions can be made.


  ## Behavior

  - If you behave inappropriately during one of Online's events, you will be financially responsible for any damages and might risk being banned from all of Online's events.


  ## Corporate Events

  - For corporate events, the doors open according to the start time of the event. Ten minutes after the doors open, attendees on the waiting list are admitted if there is space. Admission closes 15 minutes after the doors open.
  - Participants at corporate events are required to respond to the electronic feedback after the events. An email will be sent after the event with a link to the feedback form that must be answered within the given deadline. If a participant does not respond within the deadline, this will result in 2 marks being given.
  - Participants at corporate events must attend all mandatory parts of the event. For company presentations and courses, this means the presentation itself and the course setup. The first 45 minutes followed by mingling are also considered mandatory. If a participant leaves the mandatory part without a valid reason, this will result in 2 marks being given.


  ## Why did I receive a mark?

  Under "Settings" and "Marks and Suspensions" (https://online.ntnu.no/profile/settings/penalties) you can view your marks and their respective reasons.

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
