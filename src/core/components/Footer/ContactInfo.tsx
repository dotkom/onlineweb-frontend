import React from 'react';
import style from './footer.less';

export interface IContactInfo {
  className: string;
  value: string;
}

const CONTACT: IContactInfo[] = [{
    className: 'glyphicon glyphicon-briefcase',
    value: '992 548 045 (OrgNr)'
  }, {
    className: 'glyphicon glyphicon-envelope',
    value: 'kontakt@online.ntnu.no'
  }, {
    className: 'glyphicon glyphicon-file',
    value: 'okonomi@online.ntnu.no'
  }, {
    className: 'glyphicon glyphicon-phone',
    value: '73 59 64 89'
  }
]

const ContactInfo = () => (
  <div className={style.contactInfo}>
    { CONTACT.map(({ className, value }) => (
      <div className={style.contactItem}>
        <span className={ className }></span>{ value }
      </div>
    )) }
  </div>
)

export default ContactInfo;
