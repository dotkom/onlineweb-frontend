import classNames from 'classnames';
import React, { Component } from 'react';

import style from '../less/contribution.less';
import { getLanguageColor } from '../models/Language';
import { IRepositoryLanguage } from '../models/Repository';

export interface IProps {
  tooltip: string;
  totalLanguageSize: number;
  numLanguages: number;
  index: number;
  language: IRepositoryLanguage;
}

export interface IState {
  hover: boolean;
}

export default class LanguageSubBar extends Component<IProps, IState> {
  public readonly state: IState = { hover: false };

  public handleMouseIn = () => this.setState({ hover: true });

  public handleMouseOut = () => this.setState({ hover: false });

  public render() {
    const { language, totalLanguageSize, numLanguages, tooltip, index } = this.props;

    const color = getLanguageColor(language.type);
    const subStyle: React.CSSProperties = {
      backgroundColor: color ? color : 'brown',
      width: (language.size / totalLanguageSize) * 100 + '%',
      display: 'flex',
      justifyContent: 'center',
    };

    // If there is only 1 language, apply borderRadius to both sides
    if (index === 0 && numLanguages === 1) {
      subStyle.borderRadius = '20px 20px 20px 20px';
      // If language is first, apply borderRadius to left side
    } else if (index === 0) {
      subStyle.borderRadius = '20px 0 0 20px';
      // If language is last, apply borderRadius to right side
    } else if (index === numLanguages - 1) {
      subStyle.borderRadius = '0 20px 20px 0';
    }

    return (
      <div style={subStyle} onMouseOver={this.handleMouseIn} onMouseOut={this.handleMouseOut}>
        <div className={classNames(style.toolTip, { [style.active]: this.state.hover })}>{tooltip}</div>
      </div>
    );
  }
}
