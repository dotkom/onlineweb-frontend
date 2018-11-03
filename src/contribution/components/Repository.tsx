import React from 'react';
import { IRepository } from '../models/Repository';
import ReactMarkdown from 'react-markdown';
import style from '../less/contribution.less';

const Repository = ({ id, name, description, url, languages }: IRepository) => {
    const languageBar = [];
    const languageColors: any = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'CSS':        '#563d7c',
        'HTML':       '#e34c26',
        'Python':     '#3572A5',
        'Makefile':   '#427819'
    };

    // Determine total size of languages
    let totalLanguageSize: number = 0;
    for (const language of languages) {totalLanguageSize += language.size}

    // Generate horizontal bar
    for (const [index, language] of languages.entries()) {
        const color = languageColors[language.type];
        const sub_style: any = {
            backgroundColor: color ? color : 'brown' ,
            width: ((language.size/totalLanguageSize) * 100) + '%'
        };

        const borderRadius = 'borderRadius';
        if (index === 0) {
            sub_style[borderRadius] = '20px 0 0 20px';
        } else if (index === languages.length - 1) {
            sub_style[borderRadius] = '0 20px 20px 0';
        }

        languageBar.push(
            <div style={sub_style} key={id+language.type+language.size} />
        );
    }

    return (
        <a className={style.repositoryContainer} href={url}>
            <span className={style.repositoryContent}>
                <div className={style.header}>
                    <h3>{name}</h3>
                    <hr/>
                    <ReactMarkdown source={description} />
                </div>
                <div className={style.issues}>
                    <span>
                        <h2>{id}</h2>
                        <h2>Issues</h2>
                    </span>
                </div>
            </span>
            <div className={style.languageBar}>
                <span>
                    {languageBar}
                </span>
            </div>
        </a>
    );
};

export default Repository;
