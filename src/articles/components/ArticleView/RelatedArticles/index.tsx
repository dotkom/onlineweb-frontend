import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DOMAIN } from '../../../../common/constants/endpoints';
import { getArticles } from '../../../api';
import { IArticle } from '../../../models/Article';
import { routes } from '../../ArticlesRouter';

import style from '../articleView.less';

export interface IProps {
  mainArticle: IArticle;
}

export const RelatedArticles: FC<IProps> = ({ mainArticle }) => {
  const [relatedArticles, setRelatedArticles] = useState<IArticle[]>([]);

  const updateRelatedArticleList = (articles: IArticle[]) => {
    const oldArticles = relatedArticles.filter((oldArticle) => {
      const newArticleIds = articles.map((article) => article.id);
      return !newArticleIds.includes(oldArticle.id);
    });
    const allArticles = oldArticles
      .concat(articles)
      .filter((article) => article.id !== mainArticle.id)
      .filter((article) => article.tags.some((articleTag) => mainArticle.tags.includes(articleTag)));

    return allArticles
      .filter((article, idx, final) => final.map((e) => e.id).indexOf(article.id) === idx)
      .sort((a, b) => {
        return Date.parse(b.published_date) - Date.parse(a.published_date);
      });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      let incomingRelatedArticleList: IArticle[] = [];
      for (const tag of mainArticle.tags) {
        const tagArticles = await getArticles({ tags: tag });
        incomingRelatedArticleList = incomingRelatedArticleList.concat(tagArticles);
      }
      const updatedRelatedArticleList = updateRelatedArticleList(incomingRelatedArticleList);
      setRelatedArticles(updatedRelatedArticleList);
    };
    fetchArticles();
  }, [mainArticle]);

  return (
    <aside className={style.relatedArticles}>
      {relatedArticles.map((article) => (
        <section key={article.id} className={style.relatedArticle}>
          <Link to={routes.detail.slice(0, -3) + article.id}>
            <img
              className={style.relatedArticleImage}
              src={DOMAIN + article.image.lg}
              alt={article.image.description}
            />
            <h3 className={style.relatedArticleHeading}>{article.heading}</h3>
          </Link>
        </section>
      ))}
    </aside>
  );
};
