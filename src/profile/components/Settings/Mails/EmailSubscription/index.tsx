import { Markdown } from '@dotkomonline/design-system';
import { useEffect, useState } from 'react';
import ActivateButton from './ActivateButton';
import { SUBSCRIPTION_INFO, OPPORTUNITIES_INFO } from '../mailInformation';
import { getProfile, putProfile } from 'profile/api';
import { useToast } from 'core/utils/toast/useToast';
import { Pane } from 'common/components/Panes';
import { IUserProfile } from 'profile/models/User';

const EmailSubscription = () => {
  const [infoSubscribed, setInfoSubscribed] = useState(false);
  const [jobmailSubscribed, setJobmailSubscribed] = useState(false);

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

  return (
    <>
      <Pane>
        <div>
          <Markdown>{SUBSCRIPTION_INFO}</Markdown>
          <ActivateButton
            activated={infoSubscribed}
            name="infomail"
            callback={() => setInfoSubscribed(!infoSubscribed)}
          />
        </div>
      </Pane>
      <Pane>
        <div>
          <Markdown>{OPPORTUNITIES_INFO}</Markdown>
          <ActivateButton
            activated={jobmailSubscribed}
            name="jobmail"
            callback={() => setJobmailSubscribed(!jobmailSubscribed)}
          />
        </div>
      </Pane>
    </>
  );
};

export default EmailSubscription;
