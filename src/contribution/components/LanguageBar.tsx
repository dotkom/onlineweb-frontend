import React, { Component } from 'react';
import style from '../less/contribution.less';
import {IRepositoryLanguage} from '../models/Repository';
import LanguageSubBar from './LanguageSubBar';

export interface IProps {
    id: string;
    languages: IRepositoryLanguage[];
}

export default class LanguageBar extends Component<IProps, {}> {
    public readonly state = { languages: [], hover: false };

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const languageBar = [];

        // Determine total size of languages
        let totalLanguageSize: number = 0;
        for (const language of this.props.languages) {totalLanguageSize += language.size}
        const numLanguages: number = this.props.languages.length;

        // Generate horizontal bar
        for (const [index, language] of this.props.languages.entries()) {
            languageBar.push(
                <LanguageSubBar tooltip={language.type}
                                numLanguages={numLanguages}
                                language={language}
                                totalLanguageSize={totalLanguageSize}
                                index={index}
                                key={language.size+this.props.id}
                />
            );
        }

        return(
            <div className={style.languageBarContainer}>
                {languageBar}
            </div>
        );
    }
}
