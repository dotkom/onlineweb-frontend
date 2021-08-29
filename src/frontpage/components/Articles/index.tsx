import React, { FC } from 'react';
import { Item } from 'rss-parser';

import Heading from 'common/components/Heading';

import style from './articles.less';
import MainArticle from './MainArticle';
import SmallArticle from './SmallArticle';

export interface Article extends Item {
  id: string;
  thumbnail: {
    $: { url: string };
  };
  'media:thumbnail': string;
  'media:content': string;
  content: string;
  link: string;
  pubDate: string;
}

interface IProps {
  articles: Article[];
}

const Articles: FC<IProps> = (props) => {
  const { articles } = props;
  return (
    <section className={style.articles}>
      <Heading title="Artikler" />
      <div className={style.container}>
        {articles.length ? (
          <>
            <MainArticle article={articles[0]} />
            <article className={style.smallContainer}>
              {articles.slice(1, 4).map((article) => (
                <SmallArticle key={article.id} article={article} />
              ))}
            </article>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default Articles;
