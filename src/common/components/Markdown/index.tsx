import classNames from 'classnames';
import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import style from './markdown.less';

const Markdown = ({ ...props }: ReactMarkdownProps) => {
  const markdownStyles = classNames(style.markdown, props.className);
  return <ReactMarkdown {...props} className={markdownStyles} />;
};

export const md = (sourceTemplate: TemplateStringsArray, ...vars: string[]) => {
  const templateList: string[] = [];
  for (let i = 0; i < sourceTemplate.length; i++) {
    templateList.push(sourceTemplate[i]);
    if (i < vars.length) {
      templateList.push(vars[i]);
    }
  }
  return <Markdown source={templateList.join('')} />;
};

export default Markdown;
