import Head from 'next/head';
import React from 'react';

import { ArticleByline } from './ArticleByline';
import { ArticleMeta } from './ArticleMeta';

import style from './articleView.less';
import BlockContent from '@sanity/block-content-to-react';
import client from 'core/sanity/client';
import imageUrlBuilder from '@sanity/image-url'


export interface IProps {
  published_date: string,
  authors: string[]
  changed_date: string,
  tags: string[]
  content: []
  ingress: []
  heading: string
  image: any
}

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

export const ArticleView = ({heading, 
  published_date, 
  authors, 
  ingress, 
  changed_date, 
  tags, 
  content, 
  image }: IProps) => {

  return (
    <div className={style.container}>
      <Head>
      </Head>
      <article className={style.article}>
      <img
            src={urlFor(image)
              .width(400)
              .url() as string}
          />
        <ArticleByline authors={authors} published_date={published_date} />
        <div className={style.articleMain}>
          <header className={style.articleHeader}>
            <h1>{heading}</h1>
          </header>
          <div className={style.ingress}>
            <hr />
            <BlockContent
            blocks={ingress}
            {...client.config()}
            />
          </div>

          <BlockContent
          className={style.articleText}
          blocks={content}
          {...client.config()}
          />
        </div>

        <ArticleMeta changed_date={changed_date} published_date={published_date} tags={tags} />
      </article>
    </div>
  );
};
