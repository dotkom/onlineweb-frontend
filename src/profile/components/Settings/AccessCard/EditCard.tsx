import { faCheckCircle as Check } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faChevronCircleRight as ChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronCircleRight';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { UserContext } from 'authentication/providers/UserProvider';
import classname from 'classnames';
import { putProfile } from 'profile/api';
import { toggleEMandRFID } from 'profile/utils/rfid';
import React, { Component, ContextType } from 'react';
import style from './input.less';

export interface IProps {
  refetchProfile: () => void;
}

export interface IState {
  emCode: string | null;
  valid?: boolean;
  registered: boolean;
}

const INITIAL_STATE: IState = {
  emCode: null,
  registered: false,
};

const EMCodeRe = new RegExp(/^\d{8,10}$/);
const validEMCode = (code: string): boolean => EMCodeRe.test(code);

const VALID_TEXT = `Klikk her for å registrere adgangskortet ditt`;
const INVALID_TEXT = `EM koden må være gyldig for at du skal kunne registrere kortet`;

class EditCard extends Component<IProps, IState> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;
  public state: IState = {
    emCode: null,
    registered: false,
  };

  public editEMCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emCode = event.target.value;
    this.setState({ emCode, valid: validEMCode(emCode) });
  };

  public reset = () => {
    this.setState(INITIAL_STATE);
  };

  public submitCode = async () => {
    const { refetchProfile } = this.props;
    const { emCode, valid } = this.state;
    const { user } = this.context;
    if (valid && emCode) {
      const rfid = toggleEMandRFID(emCode);
      if (user) {
        // TODO: Give more feedback to the user
        const profile = await putProfile({ rfid }, user);
        this.setState({ registered: profile.rfid === rfid });
        refetchProfile();
      }
    }
  };

  public render() {
    const { emCode: newCode, valid, registered } = this.state;
    return (
      <div className={style.editCardInput}>
        <p>EM</p>
        <input type="number" tabIndex={0} onChange={this.editEMCode} value={newCode !== null ? newCode : ''} />
        <button
          className={classname({
            [style.buttonChecked]: registered,
            [style.buttonValid]: valid,
            [style.buttonInvalid]: !valid,
          })}
          disabled={!valid}
          title={valid ? VALID_TEXT : INVALID_TEXT}
          onClick={this.submitCode}
        >
          <Icon icon={registered ? Check : ChevronRight} />
        </button>
      </div>
    );
  }
}

export default EditCard;
