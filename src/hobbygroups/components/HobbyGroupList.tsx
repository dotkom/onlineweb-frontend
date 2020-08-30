import React, { FC } from 'react';

import { IHobbyGroup } from '../models/HobbyGroup';
import { Hobbies } from './Hobbies';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export interface IHobbyGroupListState {
  allHobbyGroup: IHobbyGroup[];
}

const sortHobbies = (a: IHobbyGroup, b: IHobbyGroup) => (b.priority || 0) - (a.priority || 0);
const GET_HOBBY_GROUPS = gql`
  query {
    allHobbyGroup {
      title
      description
      read_more_link
      active
      image {
        asset {
          url
        }
      }
    }
  }
`;

const HobbyGroupList: FC<{}> = () => {
  const { loading, data, error } = useQuery<IHobbyGroupListState>(GET_HOBBY_GROUPS);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oopsie woopsie</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  const displayGroups = data.allHobbyGroup.filter((hobby) => hobby.active).sort(sortHobbies);
  return <Hobbies hobbies={displayGroups} />;
};

export default HobbyGroupList;
