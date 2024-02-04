import { Pane } from 'common/components/Panes';
import React, { FC, useEffect, useState } from 'react';
import { Card, Markdown, Spinner } from '@dotkomonline/design-system';
import style from './mail.less';
import { MAIL_INFO } from './mailInformation';
import EmailSubscription from './EmailSubscription';
import { getUser } from 'authentication/api';
import AddMailField from './MailForm/AddMailField';
import { useToast } from 'core/utils/toast/useToast';
import { putProfile } from 'profile/api';

const Mails: FC = () => {
  const [mail, setMail] = useState<string>();
  const [addMessage, cancelToast] = useToast({ type: 'success', duration: 15000 });

  const fetchMails = async () => {
    const user = await getUser();
    setMail(user?.profile.email);
  };

  useEffect(() => {
    fetchMails();
  }, []);

  const changeEmail = async (mail: string) => {
    try {
      await putProfile({ email: mail });
    } catch (err) {
      cancelToast();
      addMessage('En feil skjedde: Vi kunne ikke legge til din nye mail');
      throw err;
    }
  };

  if (!mail) {
    return <Spinner />;
  }

  return (
    <>
      <Pane>
        <Markdown>{MAIL_INFO}</Markdown>
        <Card className={style.mailCard}>
          <ul>
            {mail && (
              <li className={style.mail} tabIndex={0}>
                <h4>{mail}</h4>
              </li>
            )}
          </ul>
        </Card>
        <div>
          <AddMailField onSubmit={changeEmail} />
        </div>
      </Pane>
      <EmailSubscription />
    </>
  );
};

export default Mails;
