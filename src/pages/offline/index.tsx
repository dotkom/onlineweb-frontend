import Heading from 'common/components/Heading';
import { IOfflineIssue } from 'frontpage/models/Offline';
import Offline from 'offline';
import React, { FC } from 'react';

interface ServerSideProps {
  offlines?: IOfflineIssue[];
}

const Offlines: FC<ServerSideProps> = () => {
  return (
    <section>
      <Heading title="Offlines" />
      <Offline />
    </section>
  );
};

export default Offlines;
