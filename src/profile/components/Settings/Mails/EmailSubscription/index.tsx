import { Markdown } from '@dotkomonline/design-system';
import { useEffect, useState } from 'react';
import ActivateButton from './ActivateButton';
import { SUBSCRIPTION_INFO, OPPORTUNITIES_INFO } from '../mailInformation';
import { getProfile, putProfile } from 'profile/api';
import { useToast } from 'core/utils/toast/useToast';
import { Pane } from 'common/components/Panes';

const EmailSubscription = () => {
  const [infoSubscribed, setInfoSubscribed] = useState(false);
  const [jobmailSubscribed, setJobmailSubscribed] = useState(false);
  const [addMessage, cancelToast] = useToast({ type: 'success', duration: 5000 });
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      if (profile) {
        setInfoSubscribed(profile.infomail);
        setJobmailSubscribed(profile.jobmail);
      }
    };
    fetchProfile();
  }, [infoSubscribed, jobmailSubscribed]);

  const changeInfoMail = async () => {
    try {
      await putProfile({ infomail: !infoSubscribed });
      setInfoSubscribed(!infoSubscribed);
      cancelToast();
      addMessage(`Du har meldt deg ${!infoSubscribed ? 'på' : 'av'} infomail-lista.`);
    } catch (e) {
      console.log(e);
    }
  };

  const changeJobMail = async () => {
    try {
      await putProfile({ jobmail: !jobmailSubscribed });
      setJobmailSubscribed(!jobmailSubscribed);
      cancelToast();
      addMessage(`Du har meldt deg ${!jobmailSubscribed ? 'på' : 'av'} muligheter-lista.`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Pane>
        <div>
          <Markdown>{SUBSCRIPTION_INFO}</Markdown>
          <ActivateButton activated={infoSubscribed} onClick={changeInfoMail} />
        </div>
      </Pane>
      <Pane>
        <div>
          <Markdown>{OPPORTUNITIES_INFO}</Markdown>
          <ActivateButton activated={jobmailSubscribed} onClick={changeJobMail} />
        </div>
      </Pane>
    </>
  );
};

export default EmailSubscription;
