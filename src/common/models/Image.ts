export default interface IImage extends IImageSizes {
  id: number;
  name: string;
  timestamp: string;
  description: string;
  tags: string[];
  photographer: string;
}

export interface IImageSizes {
  thumb: string;
  original: string;
  wide: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;
}

export const DEFAULT_EVENT_IMAGE: IImage = {
  id: 95,
  name: 'Generisk arrangementsbilde',
  timestamp: '2016-10-16T15:26:40.184370+02:00',
  description: 'Midlertidig bilde for arrangementer',
  thumb: '/media/images/responsive/thumbnails/86b20aca-4368-4b3a-8f10-707c747eb03f.png',
  original: '/media/images/responsive/86b20aca-4368-4b3a-8f10-707c747eb03f.png',
  wide: '/media/images/responsive/wide/86b20aca-4368-4b3a-8f10-707c747eb03f.png',
  lg: '/media/images/responsive/lg/86b20aca-4368-4b3a-8f10-707c747eb03f.png',
  md: '/media/images/responsive/md/86b20aca-4368-4b3a-8f10-707c747eb03f.png',
  sm: '/media/images/responsive/sm/86b20aca-4368-4b3a-8f10-707c747eb03f.png',
  xs: '/media/images/responsive/xs/86b20aca-4368-4b3a-8f10-707c747eb03f.png',
  tags: ['arrangement', 'bilde', 'generisk'],
  photographer: '',
};
