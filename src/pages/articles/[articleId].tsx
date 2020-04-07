import { useRouter } from 'next/router';
import React from 'react';

import { ArticleView } from 'articles/components/ArticleView';

const ArticleDetailPage = () => {
  const router = useRouter();
  const articleId = Number(router.query.articleId);
  return <ArticleView articleId={articleId} />;
};

export default ArticleDetailPage;
