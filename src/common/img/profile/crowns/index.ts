import { CommitteePosition } from 'profile/models/Comittee';

import economy from './bankom-hat.svg';
import king from './king-crown.svg';
import offline from './offline.svg';
import prince from './prince-crown.svg';

const crowns: { [K in CommitteePosition]: string } = {
  leder: king,
  nestleder: prince,
  økonomiansvarlig: economy,
  redaktør: offline,
  medlem: '',
};

export default crowns;
