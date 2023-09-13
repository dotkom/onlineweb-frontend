import { Card, Icon, Markdown } from '@dotkomonline/design-system';
import { Pane } from 'common/components/Panes';
import { useToast } from 'core/utils/toast/useToast';
import { getCalendarLink } from 'profile/api/calendar';
import React, { FC, useCallback, useEffect } from 'react';
import style from './calendar.less';

const MAIN_INFO_TEXT = `
  ### Kalender
  På denne siden finner du en link til en kalender med arrangementene du er meldt på. Du kan abonnere på den i din kalender-app, og du vil automatisk få arrangementer du er påmeldt rett i din personlige kalender. Nye arrangementer du melder deg på vil også automatisk bli lagt til i kalenderen din.

  Hvis du opplever at det tar lang tid før arrangementene synkroniseres til kalenderen din er det mest sannsynlig fordi kalenderen sjekker for endringer sjeldent. Google Calendar oppdaterer f.eks hver 24. time. Isåfall kan du prøve å synkronisere manuelt eller bare vente litt.
`;

const ERROR_TEXT = `
  ### Error
  Kunne ikke hente kalender-link. Ta kontakt dotkom@online.ntnu.no
`;

const Calendar: FC = () => {
  const [calendarLink, setCalendarLink] = React.useState<string>('Error');
  const [displayMessage] = useToast({ duration: 2000, overwrite: true, type: 'success' });
  const [error, setError] = React.useState<boolean>(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(calendarLink);
    displayMessage('Copied to clipboard');
  }, [calendarLink]);

  useEffect(() => {
    (async () => {
      try {
        const link = await getCalendarLink();
        setCalendarLink(link);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    })();
  }, []);

  return (
    <>
      <Pane>
        <Markdown>{MAIN_INFO_TEXT}</Markdown>
        {error ? (
          <Pane className={style.error}>
            <Markdown>{ERROR_TEXT}</Markdown>
          </Pane>
        ) : (
          <div>
            <Card className={style.mailCard} onClick={copyToClipboard}>
              Kopier kalender-link
              <Icon name="copy" />
            </Card>
            <div className={style.gcal}>
              Direkte til Google Calendar:{' '}
              <a href={`http://www.google.com/calendar/render?cid=${encodeURIComponent(calendarLink)}`}>link</a>
            </div>
          </div>
        )}
      </Pane>
    </>
  );
};

export default Calendar;
