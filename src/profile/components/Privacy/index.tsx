import React, { Component } from 'react';
import { IPrivacy } from '../../models/Privacy';
import { getPrivacyOptions, postPrivacyOptions } from '../../api/privacy';
import Option from './Option';
import { getKeys } from 'common/utils/tsHacks';
import Info from './Info';

export type PrivacyOptions = { [key in keyof IPrivacy]: boolean }

class Privacy extends Component<{}, PrivacyOptions> {
  state: PrivacyOptions = {
    expose_address: false,
    expose_email: false,
    expose_nickname: false,
    expose_phone_number: false,
    visible_for_other_users: false
  }

  /**
   * @summary Fetch Privacy options from server and put into state.
   */
  async componentDidMount() {
    const options = await getPrivacyOptions();
    this.setState({ ...options });
  }

  /**
   * @summary Toggles an option in state, sends it to server and updates state from server.
   * @param {keyof IPrivacy} key Key of the option to toggle.
   */
  togglePrivacyOption(key: keyof IPrivacy) {
    const option = this.state[key];
    // Not really tested yet.
    // The problem is that TypeScript is not happy with defined index signature definitions.
    // Therefore the solution is to set the entire state of the component, and overwrite a key at the same time.
    // If this solution  doesn't work, try; Object.assign(this.state, { [key]: !option })?
    this.setState({ ...this.state, [key]: !option }, async () => {
      const options = await postPrivacyOptions(this.state);
      this.setState(options);
    })
  }

  render() {
    const { state } = this;
    return(
      <div>
        { getKeys<IPrivacy>(state).map((key) => (
          <Option
            key={key}
            option={key}
            value={state[key]}
            toggle={() => this.togglePrivacyOption(key)}
          />
        ))}
        <Info />
      </div>
    )
  }
}

export default Privacy;
