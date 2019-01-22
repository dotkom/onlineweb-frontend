import React, { Component } from 'react';

export interface IProps {
  emCode: string;
}

export interface IState {
  emCode: string | null;
  valid?: boolean;
}

const EMCodeRe = new RegExp(/d{10}/);
const validEMCode = (code: string): boolean => EMCodeRe.test(code);

class EditCard extends Component<IProps, IState> {
  public state: IState = {
    emCode: null,
  }

  public editEMCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emCode = event.target.value;
    this.setState({ emCode, valid: validEMCode(emCode) });
  }

  public render() {
    const { emCode: oldCode } = this.props;
    const { emCode: newCode } = this.state;
    return (
      <div>
        <input
          type="text"
          onChange={this.editEMCode}
          placeholder={oldCode}
          value={newCode ? newCode : undefined} />
      </div>
    )
  }
}

export default EditCard;