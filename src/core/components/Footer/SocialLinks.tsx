import Img from 'common/components/Img';
import React from 'react';
import style from './footer.less';

export interface ISocialLink {
  name: string;
  link: string;
  icon: string;
}

const SOCIAL: ISocialLink[] = [
  {
    name: 'facebook',
    link: 'http://facebook.com/LinjeforeningenOnline',
    icon: '/static/img/social/facebook.svg',
  },
  {
    name: 'twitter',
    link: 'http://twitter.com/Online_NTNU',
    icon: '/static/img/social/twitter.svg',
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/online_ntnu/',
    icon: '/static/img/social/instagram.svg',
  },
  {
    name: 'github',
    link: 'https://www.github.com/dotkom/',
    icon: '/static/img/social/github.svg',
  },
  {
    name: 'slack',
    link: 'https://onlinentnu.slack.com/',
    icon: '/static/img/social/slack.svg',
  },
];

const SocialLink = ({ name, link, icon }: ISocialLink) => (
  <a href={link}>
    <Img src={icon} alt={name} />
  </a>
);

const SocialLinks = () => (
  <div className={style.social}>
    {SOCIAL.map((platform) => (
      <SocialLink key={platform.name} {...platform} />
    ))}
  </div>
);

export default SocialLinks;
