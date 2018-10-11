import { StaticUrl } from 'common/models/Url';

export interface IHobbyGroup {
  title: string;
  description: string;
  image?: string;
  read_more_link: string;
  priority?: number;
}
