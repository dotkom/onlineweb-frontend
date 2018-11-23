import { Committee, CommitteePosition } from './Comittee';

export interface IMedal {
  committee: Committee;
  position: CommitteePosition;
  period: string;
}
