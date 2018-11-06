import React, { Component } from 'react';
import { IRepositoryLanguage } from '../models/Repository';
import style from '../less/contribution.less';

export interface IProps {
  tooltip: string;
  totalLanguageSize: number;
  numLanguages: number;
  index: number;
  language: IRepositoryLanguage;
}

export default class LanguageSubBar extends Component<IProps, {}> {
  public readonly state = { hover: false };

  constructor(props: IProps) {
    super(props);
  }

  public handleMouseIn() {
    this.setState({ hover: true });
  }

  public handleMouseOut() {
    this.setState({ hover: false });
  }

  public render() {
    const languageColors: any = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      CSS: '#563d7c',
      HTML: '#e34c26',
      Python: '#3572A5',
      Makefile: '#427819',
      Shell: '#89e051',
    };

    const color = languageColors[this.props.language.type];
    const sub_style: any = {
      backgroundColor: color ? color : 'brown',
      width: (this.props.language.size / this.props.totalLanguageSize) * 100 + '%',
      display: 'flex',
      justifyContent: 'center',
    };

    const borderRadius = 'borderRadius';

    // If there is only 1 language, apply borderRadius to both sides
    if (this.props.index === 0 && this.props.numLanguages === 1) {
      sub_style[borderRadius] = '20px 20px 20px 20px';
      // If language is first, apply borderRadius to left side
    } else if (this.props.index === 0) {
      sub_style[borderRadius] = '20px 0 0 20px';
      // If language is last, apply borderRadius to right side
    } else if (this.props.index === this.props.numLanguages - 1) {
      sub_style[borderRadius] = '0 20px 20px 0';
    }

    const tooltipStyle = {
      display: this.state.hover ? 'flex' : 'none',
    };

    return (
      <div style={sub_style} onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
        <div className={style.toolTip} style={tooltipStyle}>
          {this.props.tooltip}
        </div>
      </div>
    );
  }
}
