import Markdown from 'common/components/Markdown';
import { Pane } from 'common/components/Panes';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { usePrefetch } from 'common/hooks/usePrefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';
import { getCompany } from 'company/api';
import { mockCompany } from 'company/models/Company';
import React, { FC, useEffect, useState } from 'react';

export interface IProps {
  id: number;
}

export const DetailView: FC<IProps> = ({ id }) => {
  const prefetchCompany = usePrefetch(PrefetchKey.COMPANY_SINGLE, async () => await getCompany(id));
  const defaultCompany = prefetchCompany && prefetchCompany.id === id ? prefetchCompany : mockCompany;

  const [company, setCompany] = useState(defaultCompany);

  useEffect(() => {
    const fetchArticle = async () => {
      const newCompany = await getCompany(id);

      setCompany(newCompany);
    };
    fetchArticle();
  }, [id]);

  return (
    <Pane>
      <h1>{company.name}</h1>
      <ResponsiveImage image={company.image} type="company" size="lg" />
      <p>{company.short_description}</p>
      <Markdown source={company.long_description} />
    </Pane>
  );
};
