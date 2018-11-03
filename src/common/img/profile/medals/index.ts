import { Committee } from 'profile/models/Comittee';

import arrkom from 'common/img/profile/medals/arrkom-medal.svg';
import bankom from 'common/img/profile/medals/bankom-medal.svg';
import bedkom from 'common/img/profile/medals/bedkom-medal.svg';
import dotkom from 'common/img/profile/medals/dotkom-medal.svg';
import fagkom from 'common/img/profile/medals/fagkom-medal.svg';
import hs from 'common/img/profile/medals/hs-medal.svg';
import prokom from 'common/img/profile/medals/prokom-medal.svg';
import trikom from 'common/img/profile/medals/trikom-medal.svg';

const medal: { [K in Committee]: string } = {
  arrkom,
  bankom,
  bedkom,
  dotkom,
  fagkom,
  hovedstyret: hs,
  prokom,
  trikom,
  seniorkom: hs,
};

export default medal;
