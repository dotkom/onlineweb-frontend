import classNames from 'classnames';
import React from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
import style from './markdown.less';

const Markdown = ({ ...props }: ReactMarkdownProps) => {
  const markdownStyles = classNames(style.markdown, props.className);
  return <ReactMarkdown {...props} className={markdownStyles} />;
};

export const md = (sourceTemplate: TemplateStringsArray) => <Markdown source={sourceTemplate.join('\n')} />;

export default Markdown;
