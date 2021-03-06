import { Pane } from 'common/components/Panes';
import React, { FC, useEffect, useState } from 'react';
import { getMails, patchMails, postMail } from '../../../api/mail';
import { IMail } from '../../../models/Mail';
import Mail from './Mail';
import { Spinner, Card, Markdown } from '@dotkomonline/design-system';
import style from './mail.less';
import { MAIL_INFO, PRIMARY_MAIL_INFO } from './mailInformation';
import AddMailField from './MailForm/AddMailField';
import SelectPrimaryField from './MailForm/SelectPrimaryField';
import { useToast } from 'core/utils/toast/useToast';
import EmailSubscription from './EmailSubscription';

export interface IState {
  addresses: IMail[];
}

const Mails: FC = () => {
  const [mails, setMails] = useState<IMail[]>();
  const [addMessage, cancelToast] = useToast({ type: 'success', duration: 15000 });

  const fetchMails = async () => {
    const mails = await getMails();
    setMails(mails.sort((a, b) => Number(a.primary) - Number(b.primary)).reverse());
  };

  useEffect(() => {
    fetchMails();
  }, []);

  const saveNewPrimaryMail = async (mail: IMail) => {
    try {
      await patchMails(mail.id, { primary: true });
      addMessage(PRIMARY_MAIL_INFO);
      fetchMails();
    } catch (err) {
      cancelToast();
      addMessage('En feil skjedde: Vi kunne ikke lagre din nye primær-epost');
      // This throw is for Sentry to catchup
      throw err;
    }
  };

  const addNewMail = async (mail: Partial<IMail>) => {
    try {
      await postMail(mail);
      fetchMails();
    } catch (err) {
      cancelToast();
      addMessage('En feil skjedde: Vi kunne ikke legge til din nye mail');
      throw err;
    }
  };

  if (!mails) {
    return <Spinner />;
  }

  return (
    <>
      <Pane>
        <Markdown>{MAIL_INFO}</Markdown>
        <Card className={style.mailCard}>
          <ul>
            {mails.map((mail) => (
              <Mail {...mail} key={mail.email} callback={fetchMails} />
            ))}
          </ul>
        </Card>
        <div>
          <SelectPrimaryField mails={mails} onSubmit={saveNewPrimaryMail} />
          <AddMailField onSubmit={addNewMail} />
        </div>
      </Pane>
      <EmailSubscription />
    </>
  );
};

export default Mails;
