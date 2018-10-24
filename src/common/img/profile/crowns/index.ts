import { CommitteePosition } from 'profile/models/Comittee';

import king from './king-crown.svg';
import prince from './prince-crown.svg';
import economy from './bankom-hat.svg';
import offline from './offline.svg';

const crowns: { [K in CommitteePosition]: string } = {
  leder: king,
  nestleder: prince,
  økonomiansvarlig: economy,
  redaktør: offline,
  medlem: '',
};

export default crowns;
