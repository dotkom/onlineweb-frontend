import React, { FC, useEffect, useState } from 'react';

import { Pane } from 'common/components/Panes';
import { getKeys } from 'common/utils/tsHacks';
import { useToast } from 'core/utils/toast/useToast';
import { getPrivacyOptions, putPrivacyOptions } from 'profile/api/privacy';
import { IPrivacy } from 'profile/models/Privacy';

import Info from './Info';
import Option from './Option';

export type PrivacyOptions = { [key in keyof IPrivacy]: boolean };

const INITIAL_STATE: PrivacyOptions = {
  expose_address: false,
  expose_email: false,
  expose_nickname: false,
  expose_phone_number: false,
  visible_for_other_users: false,
  visible_as_attending_events: false,
  allow_pictures: false,
};

const Privacy: FC = () => {
  const [options, setOptions] = useState<PrivacyOptions>(INITIAL_STATE);

  const [displaySuccess] = useToast({ overwrite: true, type: 'success' });
  const [displayError] = useToast({ overwrite: true, type: 'error' });

  /** Fetch Privacy options from server and put into state. */
  const fetchInitial = async () => {
    const serverOptions = await getPrivacyOptions();
    setOptions({ ...serverOptions });
  };

  /** Saves/sends current options to server and updates state from server. */
  const savePrivacyOptions = async (newOptions: PrivacyOptions) => {
    const serverOptions = await putPrivacyOptions(newOptions);
    if (serverOptions) {
      setOptions(serverOptions);
      displaySuccess('Innstillingen ble oppdatert.');
    } else {
      displayError('Det skjedde noe galt under uppdateringen av innstillingen.');
    }
  };

  /**
   * @summary Toggles an option in state.
   * @param {keyof IPrivacy} key Key of the option to toggle.
   */
  const togglePrivacyOption = async (key: keyof IPrivacy) => {
    const option = options[key];
    const newOptions: PrivacyOptions = { ...options, [key]: !option };
    setOptions(newOptions);
    savePrivacyOptions(newOptions);
  };

  /** Fetch initial options on component mount */
  useEffect(() => {
    fetchInitial();
  }, []);

  return (
    <Pane>
      <Info />
      {getKeys<IPrivacy>(options).map((key) => (
        <Option key={key} option={key} value={options[key]} toggle={() => togglePrivacyOption(key)} />
      ))}
    </Pane>
  );
};

export default Privacy;
