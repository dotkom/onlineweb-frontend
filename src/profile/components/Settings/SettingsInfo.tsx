import Markdown from 'common/components/Markdown';
import { Pane } from 'common/components/Panes';
import { getProfile } from 'profile/api';
import { IUserProfile } from 'profile/models/User';
import { useEffect, useState } from 'react';
import KeyValue from '../Profile/KeyValue';

const MAIN_INFO_TEXT = `
  # Innstillinger

  På denne siden kan du finne innstillinger og informasjon knyttet til profilen din.
  
`;

const SettingsInfo = () => {
  const [profile, setProfile] = useState<IUserProfile | undefined>(undefined);

  useEffect(() => {
    const fetchedProfile = async () => {
      const profile = await getProfile();
      setProfile(profile);
    };

    fetchedProfile();
  }, []);

  return (
    <Pane>
      <Markdown source={MAIN_INFO_TEXT} />
      {profile ? (
        <>
          <KeyValue k="Navn" v={`${profile.first_name} ${profile.last_name}`} bold />
          <KeyValue k="Klassetrinn" v={`${profile.year}. klasse`} bold />
          <KeyValue k="Adresse" v={`${profile.address}, ${profile.zip_code} ${profile.city}`} bold />
          <KeyValue k="Telefon" v={profile.phone_number} bold />
          <KeyValue k="Kallenavn" v={profile.nickname} bold />
          <KeyValue k="NTNU-brukernavn" v={profile.ntnu_username} bold />
          <KeyValue k="RFID" v={profile.rfid} bold />
          <KeyValue k="Allergier" v={profile.allergies} bold />
        </>
      ) : null}
    </Pane>
  );
};

export default SettingsInfo;
