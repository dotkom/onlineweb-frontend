import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons/faBriefcase';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import style from './footer.less';

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
      <p className={style.contactItem} key={value}>
        <FontAwesomeIcon icon={icon} fixedWidth />
        {value}
      </p>
    ))}
  </div>
);

export default ContactInfo;
