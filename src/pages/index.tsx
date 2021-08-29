import FrontPageComponent from 'frontpage';
import { Article } from 'frontpage/components/Articles';
import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import Parser from 'rss-parser';

interface IProps {
  articles: Article[];
}

const Frontpage: NextPage<IProps> = (props) => {
  return <FrontPageComponent {...props} />;
};

export default Frontpage;

const parser: Parser<{}, Article> = new Parser({
  customFields: {
    item: [['media:thumbnail', 'thumbnail']],
  },
});

export const getStaticProps: GetStaticProps<IProps> = async (_context) => {
  try {
    const articles = (await parser.parseURL('https://dotkom.github.io/articles/feed.xml')).items;
    return {
      props: { articles },
    };
  } catch {
    return {
      props: { articles: [] },
    };
  }
};
