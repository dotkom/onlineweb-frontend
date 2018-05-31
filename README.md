# Onlineweb Frontend

## Hva er dette for noe :question:

<details><summary>Holy shit! What is this?!</summary>
<p>
  
Forged in God very flames,\
Do mine eyes, tell me lies?\
A new Dotkom project!\
\
Time is nigh! I must fly!\
Venture forth on mye quest,\
Goodbye Splash, goodbye Grades*,\
And goodbye S-D-F!\
\
I'll be off, Notiwall!\
Catch you later AMaCS!\
I'll be gone, Nibble2!\
I'm no longer your fool!\
\
Monoliths filled the gap while I waited to commit,\
The adventure of our lifes, now the frontend has split!

</p>
</details>

Nei, men egentlig er dette for forsøk / tankeprosjekt for hva Onlinwebben kan være i fremtiden.

## Hvorfor :question:
- Jeg ville.
- Eksamenprokrastinering.
- Alle ting må starte et sted, nå er vi kanskje et steg nærmere.
- Noen :tm: måtte gjøre noe.

## Hvordan :question:

Det er et veldig godt spørsmål.

Hva skal vi bygge, og hvordan skal vi bygge det?

### Det som må gjøres

- [x] Lag GitHub repo
- [x] Finn hovedteknologi
- [ ] Overfør nåværede front-end løsning til den nye applikasjonen. Hovedsaklig HTML og CSS. Repliker funksjonaliteten i React.
- [ ] Utvid API-et til Onlineweb4 slik at vi hente ut informasjonen som ikke ennå er tilgjengelig.

### Arkitektur

*I would believe it is already decided that this project is going to use `React`. This can of course be protested, but I will continue with React in mind from now on.*

#### Typer

Typer er nice, en mening jeg har fått forsterket ved å jobbe med dette.
Akkurat nå bruker vi PropTypes i noen prosjekter, som sjekker typer ved runtime.
I dette prosjektet har jeg started med TypeScript i tankene.
TypeScript er her implementert med Babel fremfor TS sin egen kompilator.

Hva med Flow?
Flow er et alternativ til TypeScript.
Grunne til at jeg valgte TypeScript fremfor Flow var at TS har større community support, flere biblioteker har typedefinisjoner for TS, TS skal være raskere, og utviklingen av selve TS språket er mer åpen enn Flow.

Hva betyr det for oss å bruke TypeScript?
TypeScript lar/tvinger oss til å definere typer på all data som ikke er implisitt i prosjeket.
Det betyr as vi definerer for eksempel data som kommer fra API-et som et interface e.g. 
``` TypeScript
export interface IUser {
  firstname: string;
  lastname: string;
  attended_events: IEvent[];
};
```
Dette lar oss holde styr på hvilken data vi har, og hvordan den endrer seg gjennom applikasjonen.
Det gjør det også mye lettere å sette seg inn i hvordan applikasjonen funker.

Problemet som kan oppstå er at det kan være litt vanskelig å beskrive objektstrukturer hvor du behandler nøklene til objektet på avanserte måter.

#### Behandling av data

Jeg har prøvd å standardisere hvordan vi henter data i applikassjonen.
Dette gjøres med:
- en standardisert sett metoder for GET, POST, PUT, DELETE, UPDATE...
- egen mappe/fil som definerer metoder som henter fra API for hver applikasjon i systemet. (e.g. events har en egen)
- fokus på å holde behandling av data til størt mulig grad utenfor React komponentene, slik at alt som er i de omhandler viewet.
- Redux for deler av applikasjonen, for eksempel innlogget bruker

#### CSS

Sass, Less, Postcss, scopes, styled components, CSS in JS, inline. All the things.

## Hva skjer fremover

For å starte dette prosjektet må koden fra OW4 overføres til dette hit.
Den burde så 'reactifiseres' del for del, dette er allerede startet til en viss grad.
Når funksjonaliten er lik akn det puttes opp som `beta.online.ntnu.no`, og vi kan starte på å implementere redesignet.

*Høres ut som en skikkelig drittjobb, men jeg kan ikke se så mange andre måter dette faktisk kan gjøres på, med tanke på at det faktisk skal kunne fullføres*

