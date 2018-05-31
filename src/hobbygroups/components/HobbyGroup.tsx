import React from 'react';
import { IHobbyGroup } from '../models/HobbyGroup';

const getImage = (group: IHobbyGroup) => {
  return group.image ? { src: group.image.url } : { alt: group.title }
}

const HobbyGroup = (group: IHobbyGroup) => {
  const imageProps = getImage(group);
  return (
    <div className="col-xs-12 col-sm-6 col-md-6">
      <div className="col-md-5">
        <img {...imageProps} />
      </div>
      <div className="col-md-7 hobbydescription">
        <h3>{ group.title }</h3>
        <span>
          <p>
          { group.description }
          </p>
          <ul>
            <li><a href={ group.read_more_link }>Les mer om oss her!</a></li>
          </ul>
        </span>
      </div>
    </div>
  );
};

export default HobbyGroup;