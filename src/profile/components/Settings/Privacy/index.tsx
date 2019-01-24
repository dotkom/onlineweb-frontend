import { IUserContext, UserContext } from 'authentication/providers/UserProvider';
import { Pane } from 'common/components/Panes';
import { getKeys } from 'common/utils/tsHacks';
import React, { Component } from 'react';
import { getPrivacyOptions, putPrivacyOptions } from '../../../api/privacy';
import { IPrivacy } from '../../../models/Privacy';
import Info from './Info';
import Option from './Option';

export type IState = { [key in keyof IPrivacy]: boolean };

const INITIAL_STATE: IState = {
  expose_address: false,
  expose_email: false,
  expose_nickname: false,
  expose_phone_number: false,
  visible_for_other_users: false,
  visible_as_attending_events: false,
};

class Privacy extends Component<{}, IState> {
  public static contextType = UserContext;
  public state: IState = INITIAL_STATE;

  /**
   * @summary Fetch Privacy options from server and put into state.
   */
  public async componentDidMount() {
    const { user }: IUserContext = this.context;
    if (user) {
      const options = await getPrivacyOptions(user);
      this.setState({ ...options });
    }
  }

  /**
   * @summary Toggles an option in state, sends it to server and updates state from server.
   * @param {keyof IPrivacy} key Key of the option to toggle.
   */
  public togglePrivacyOption(key: keyof IPrivacy) {
    const { user }: IUserContext = this.context;
    if (user) {
      const option = this.state[key];
      this.setState({ ...this.state, [key]: !option }, async () => {
        const options = await putPrivacyOptions(this.state, user);
        this.setState(options);
      });
    }
  }

  public render() {
    const { state } = this;
    return (
      <Pane>
        <Info />
        {getKeys<IPrivacy>(state).map((key) => (
          <Option key={key} option={key} value={state[key]} toggle={() => this.togglePrivacyOption(key)} />
        ))}
      </Pane>
    );
  }
}

export default Privacy;
