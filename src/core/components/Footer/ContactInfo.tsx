import React from 'react';
import style from './footer.less';
import { faBriefcase, faEnvelope, faFile, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IContactInfo {
  icon: IconProp;
  value: string;
}

const CONTACT: IContactInfo[] = [
  {
    icon: faBriefcase,
    value: '992 548 045 (OrgNr)',
  },
  {
    icon: faEnvelope,
    value: 'kontakt@online.ntnu.no',
  },
  {
    icon: faFile,
    value: 'okonomi@online.ntnu.no',
  },
  {
    icon: faPhone,
    value: '73 59 64 89',
  },
];

const ContactInfo = () => (
  <div className={style.contactInfo}>
    {CONTACT.map(({ icon, value }) => (
      <div className={style.contactItem}>
        <FontAwesomeIcon icon={icon} fixedWidth />
        {value}
      </div>
    ))}
  </div>
);

export default ContactInfo;
