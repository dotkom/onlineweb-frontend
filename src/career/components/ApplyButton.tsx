import React, { FC } from 'react';

import { Link } from 'core/components/Router';

import style from '../less/career.less';

import { Button } from '@dotkomonline/design-system';

interface IProps {
  application_link: string;
  application_email: string;
}

const ApplyButton: FC<IProps> = ({ application_link, application_email }) => {
  const link = application_link || (application_email ? `mailto:${application_email}` : '');

  return (
    <div>
      {link ? (
        <div>
          <Link href={link}>
            <Button className={style.applyButton} color="success">
              Søk her!
            </Button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ApplyButton;
