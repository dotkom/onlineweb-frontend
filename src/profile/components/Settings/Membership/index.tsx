import React, { useEffect, useState } from 'react';
import Markdown from 'common/components/Markdown';
import Link from 'next/link';
import { Pane } from 'common/components/Panes';
import { Button } from '@dotkomonline/design-system';
import style from './membership.less';
import { getMembershipStatus } from 'profile/api/membership';
import { IMembershipApplication } from 'profile/models/Membership';
import { IUserProfile } from 'profile/models/User';
import { getProfile } from 'profile/api';
import MembershipPanel from './MembershipPanel';
import ManualSubmission from './ManualSubmission';

const ABOUT_PROFILE_MEMBERSHIP = `
  # Medlemskap

  Her kan du administrere dine søknader for medlemskap i Online, Linjeforeningen for Informatikk!
  Ved å sende inn en medlemskapssøknad, kan du få muligheten til å delta på Online sine mange arrangementer gjennom skoleåret.
  Hvorfor nøle? Søk nå! 
`;

const Membership = () => {
  const [membershipApplication, setMembershipApplication] = useState<IMembershipApplication | undefined>(undefined);
  const [profile, setProfile] = useState<IUserProfile | undefined>(undefined);
  const [manualSubmission, setManualSubmission] = useState<boolean>(false);

  useEffect(() => {
    const fetchedMembership = async () => {
      const membership = await getMembershipStatus();
      setMembershipApplication(membership);
    };

    const fetchedProfile = async () => {
      const profile = await getProfile();
      setProfile(profile);
    };

    fetchedProfile();
    fetchedMembership();
  }, []);

  return (
    <Pane>
      <div className={style.membership}>
        <Markdown source={ABOUT_PROFILE_MEMBERSHIP} />

        <div className={style.buttons}>
          <Link href="https://old.online.ntnu.no/dataporten/study/" passHref={true}>
            <Button color="success">Søk medlemskap automatisk gjennom Dataporten</Button>
          </Link>

          {!manualSubmission ? (
            <>
              <p className={style.bold}>Eller</p>
              <Button color="secondary" onClick={() => setManualSubmission(() => !manualSubmission)}>
                Søk medlemskap med manuell godkjenning
              </Button>
            </>
          ) : (
            <ManualSubmission />
          )}
          <p className={style.bold}>
            NB! Godkjente og avslåtte søknader havner nederst på siden, sjekk her før du sender inn nye søknader!
          </p>
        </div>

        {membershipApplication && profile ? (
          <MembershipPanel membership={membershipApplication} profile={profile} />
        ) : null}
      </div>
    </Pane>
  );
};

export default Membership;
