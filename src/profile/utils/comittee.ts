import { BankomHat, KingCrown, Offline, PrinceCrown } from 'common/img/profile/crowns';
import { ArrkomMedal, BankomMedal, BedkomMedal, DotkomMedal } from 'common/img/profile/medals';
import { FagkomMedal, HSMedal, ProkomMedal, TrikomMedal } from 'common/img/profile/medals';
import { Committee, CommitteePosition } from 'profile/models/Comittee';

export const getPositionCrown = (position: CommitteePosition): typeof BankomHat | null => {
  switch (position) {
    case 'leder':
      return KingCrown;
    case 'nestleder':
      return PrinceCrown;
    case 'redaktor':
      return Offline;
    case 'okoans':
      return BankomHat;
    default:
      return null;
  }
};

export const getCommitteeMedal = (committee: Committee): typeof ArrkomMedal | null => {
  switch (committee) {
    case 'arrkom':
      return ArrkomMedal;
    case 'bankom':
      return BankomMedal;
    case 'bedkom':
      return BedkomMedal;
    case 'dotkom':
      return DotkomMedal;
    case 'fagkom':
      return FagkomMedal;
    case 'hs':
      return HSMedal;
    case 'prokom':
      return ProkomMedal;
    case 'seniorkom':
      return null; // TODO: Create Seniorkom medal SVG
    case 'trikom':
      return TrikomMedal;
    default:
      return null;
  }
};
