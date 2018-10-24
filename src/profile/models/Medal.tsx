import { Committee, CommitteePosition } from './Comittee';

export interface IMedal {
  committee: Committee;
  position: CommitteePosition;
  range: string;
}
