import React from 'react';

import { NextPage } from 'next';
import { getHobbyGroups } from 'hobbygroups/api';
import { IHobbyGroup } from 'hobbygroups/models/HobbyGroup';
import HobbyGroups from 'hobbygroups';

interface HobbyGroupsListPageProps {
  hobbyGroups: IHobbyGroup[];
}

const HobbyGroupsListPage: NextPage<HobbyGroupsListPageProps> = ({ hobbyGroups }) => {
  return <HobbyGroups hobbyGroups={hobbyGroups} />;
};

HobbyGroupsListPage.getInitialProps = async () => {
  const res = await getHobbyGroups();
  return {
    hobbyGroups: res.results,
  };
};

export default HobbyGroupsListPage;
