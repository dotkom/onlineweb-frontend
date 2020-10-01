import { Pane } from 'common/components/Panes';
import React, { FC, useEffect, useState } from 'react';
import { getMails, patchMails } from '../../../api/mail';
import { IMail } from '../../../models/Mail';
import Mail from './Mail';
import { Spinner } from '@dotkomonline/design-system';

export interface IState {
  addresses: IMail[];
}

const Mails: FC = () => {
  const [mails, setMails] = useState<IMail[]>();
  const [primaryMail, setPrimaryMail] = useState<IMail>();

  useEffect(() => {
    const fetchMails = async () => {
      let mails = await getMails();
      mails = mails.sort((a, b) => Number(a.primary) - Number(b.primary)).reverse();
      setMails(mails);
      setPrimaryMail(mails.find((mail) => mail.primary));
    };
    fetchMails();
  }, [primaryMail]);

  const togglePrimary = async (address: IMail) => {
    await patchMails(address.id, { primary: true });
    const mails = await getMails();
    setMails(mails);
  };

  return (
    <Pane>
      {mails ? (
        mails.map((mail) => <Mail {...mail} toggle={() => togglePrimary(mail)} key={mail.email} />)
      ) : (
        <Spinner />
      )}
    </Pane>
  );
};

export default Mails;
