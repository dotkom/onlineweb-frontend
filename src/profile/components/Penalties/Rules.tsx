import React from 'react';
import Collapsble from 'common/components/Collapsible';

class Info extends Collapsble<{}> {
  public render() {
    const { collapsed } = this.state;
    return (
      <>
        <h3>Regler</h3>
        <div onClick={() => this.toggleCollapse()}>{ collapsed ? <p>Vis regler</p> : <Content /> }</div>
      </>
    );
  }
}

const Content = () => (
  <div>
    <div>

      <h3>Prikk?</h3>
      <p>
        Det at du har aktive prikker innebærer at du vil måtte vente 24 timer
        etter ordinær påmeldingsstart for å melde deg på et arrangement.
        Hver prikk varer i 30 dager, dersom du får ny prikk og du allerede har en aktiv prikk blir
        de nye 30 dagene lagt til på slutten av virkeperioden til eksisterende prikk(er).
      </p>
      <p>
        Varigheten til prikker er fryst i ferier.
        Disse er definert fra 1. desember til 15. januar og 1. juni til 15. august.
        Dersom en prikk gis 15. mai vil altså denne prikken utløpe 30. august.
      </p>
      <p>
        Grunnen til at vi deler ut prikker er å sørge for at medlemmer følger reglene.
      </p>

      <h3>Generelle regler:</h3>
      <p>
        Det kreves at en møter opp ved påmelding til et arrangement.
        Dersom du må melde deg av etter avmeldingsfristen har gått ut, sender du
        en mail til den ansvarlige komiteen og melder frafall slik at vi kan gi plassen din videre.
        Du vil få prikk så lenge avmeldingsfristen er ute.
      </p>
      <p>
        Hvis du står på venteliste kan du melde deg av helt til arrangementet starter.
        Når du står på venteliste er du inneforstått med at du når som helst kan
        få plass på arrangementet og dermed er bundet til reglene for arrangementet på lik linje med andre påmeldte.
      </p>
      <p>
        Ved upassende oppførsel under et av Onlines arrangement vil du stå økonomisk
        ansvarlig for eventuelle skader, og i verste fall risikere utestengelse fra alle Onlines arrangement.
      </p>
      <p>
        Dersom det oppstår noe uforutsett under et arrangment
        forventes det at man tar kontakt med de ansvarlige for arrangementet.
        Hvis du ikke varsler, og dette medfører store problemer for arrangøren, får man en prikk.
      </p>

      <h3>Sosiale arrangement</h3>
      <p>
        Betalingsfrister skal overholdes.
        Man får en prikk for betaling etter fristen, og utestenging fra
        alle arrangement fram til man har betalt det utestående beløpet.
      </p>
      <p>
        Hvis man er påmeldt et betalingsarrangement, og har betalt,
        er det ikke mulighet for å få tilbakebetalt pengene etter betalingsfristen.
        Unntak for dette vil være om det er personer på ventelisten.
        Da kan vi kontakte disse for å ta over plassen og betalingen.
        Dette må avtales med komiteen som har ansvar for betalingsarrangementet.
        Man får en prikk som vanlig når man melder seg av for sent.
      </p>

      <h3>Bedriftspresentasjoner og kurs</h3>
      <p>
        Ved frafall etter avmeldingsfristen pga sykdom må dette meldes til den ansvarlige komiteen
        senest samme dag som kurset/bedriftspresentasjonen kl.12.00.
        Avbud senere enn dette vil gi en prikk.
        Ved kurs og bedriftspresentasjon åpner dørene i henhold til starttid på arrangementet.
        Venteliste åpner ti minutter etter at dørene åpner. 15 minutter etter at dørene åpner stenger innslippet.
      </p>
      <p>
        Når ventelisten åpner slippes folk inn i den rekkefølgen de er påmeldt.
        Alle som kommer etter dette havner bakerst i køen, uavhengig om du er påmeldt eller står på venteliste.
      </p>
      <p>
        Dersom du kommer etter at ventelisten har åpnet, og arrangementet er fullt, vil du få en prikk.
        Det kreves at en deltager svarer på den elektroniske tilbakemeldingen etter bedriftspresentasjon og kurs.
        Det vil komme epost dagen etter presentasjonen med lenke til tilbakemeldingsskjema
        som må besvares innen noen få dager (frist er oppgitt i eposten).
        Om en deltager ikke svarer innen fristen vil dette gi en prikk.
      </p>

      <h3>Hvorfor har jeg fått en prikk?</h3>
      <p>
        På toppen av denne siden vil du kunne se grunnen til prikkene dine.
        Om de ikke vises kan du ta kontakt med de respektive komiteene.
      </p>
      <ul>
        <li>For sosiale arrangementer, kontakt  <a href="mailto:arrkom@online.ntnu.no">Arrkom</a>.</li>
        <li>For bedriftspresentasjoner, kontakt <a href="mailto:bedkom@online.ntnu.no">Bedkom</a>.</li>
        <li>For kurs, kontakt                   <a href="mailto:fagkom@online.ntnu.no">Fagkom</a>.</li>
        <li>For generelle henvendelser, kontakt  <a href="mailto:hovedstyret@online.ntnu.no">Hovedstyret</a>.</li>
      </ul>

      <p><strong>
        Ved upassende oppførsel under et av Onlines arrangement vil du stå økonomisk ansvarlig for eventuelle skader,
        og i verste fall risikere utestengelse fra <em>alle</em> Onlines arrangement
      </strong></p>
    </div>
  </div>
);

export default Info;
