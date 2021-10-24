import Heading from 'common/components/Heading';
import { IHobbyGroup } from 'hobbygroups/models/HobbyGroup';
import React from 'react';
import Intro from './components/Intro';
import { Hobbies } from './components/Hobbies';

const sortHobbies = (a: IHobbyGroup, b: IHobbyGroup) => (b.priority || 0) - (a.priority || 0);
const filterHobbies = (group: IHobbyGroup) => group.active;

const HobbyGroupView: React.FC<{ hobbyGroups: IHobbyGroup[] }> = ({ hobbyGroups }) => {
  const displayGroups = hobbyGroups.filter(filterHobbies).sort(sortHobbies);

  return (
    <section>
      <Heading title="Interessegrupper" />
      <Intro />
      <Hobbies hobbies={displayGroups} />
    </section>
  );
};

export default HobbyGroupView;
