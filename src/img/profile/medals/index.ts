import { Committee } from 'profile/models/Comittee';

import arrkom from 'img/profile/medals/arrkom-medal.svg';
import bankom from 'img/profile/medals/bankom-medal.svg';
import bedkom from 'img/profile/medals/bedkom-medal.svg';
import dotkom from 'img/profile/medals/dotkom-medal.svg';
import fagkom from 'img/profile/medals/fagkom-medal.svg';
import hs from 'img/profile/medals/hs-medal.svg';
import prokom from 'img/profile/medals/prokom-medal.svg';
import trikom from 'img/profile/medals/trikom-medal.svg';

const medal: {[K in Committee]: string} = {
  arrkom: arrkom,
  bankom: bankom,
  bedkom: bedkom,
  dotkom: dotkom,
  fagkom: fagkom,
  hovedstyret: hs,
  prokom: prokom,
  trikom: trikom,
  seniorkom: hs
}

export default medal
