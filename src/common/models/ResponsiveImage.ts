export default interface IResponsiveImage extends IResponsiveImageSizes {
  id: number;
  name: string;
  timestamp: string;
  description: string;
  tags: string[];
  photographer: string;
  preset: ResponsiveImageTypes;
}

export interface IResponsiveImageSizes {
  thumb: string;
  original: string;
  wide: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;
}

export type ResponsiveImageTypes =
  | 'article'
  | 'company'
  | 'event'
  | 'offline'
  | 'product'
  | 'hobby'
  | 'resource'
  | 'group';

export type ResponsiveImageDimensions = {
  [Type in ResponsiveImageTypes]: { [Size in keyof IResponsiveImageSizes]: [number, number] };
};

const DEFAULT_THUMB_SIZE = [200, 112] as [number, number];

export const IMAGE_DIMENSIONS: ResponsiveImageDimensions = {
  article: {
    thumb: DEFAULT_THUMB_SIZE,
    original: [Infinity, Infinity],
    wide: [1280, 474],
    lg: [1280, 474],
    md: [720, 405],
    sm: [864, 486],
    xs: [640, 360],
  },
  company: {
    thumb: DEFAULT_THUMB_SIZE,
    original: [Infinity, Infinity],
    wide: [720, 405],
    lg: [720, 405],
    md: [320, 180],
    sm: [320, 180],
    xs: [160, 90],
  },
  event: {
    thumb: DEFAULT_THUMB_SIZE,
    original: [Infinity, Infinity],
    wide: [1280, 720],
    lg: [1280, 720],
    md: [720, 405],
    sm: [720, 405],
    xs: [640, 360],
  },
  offline: {
    thumb: DEFAULT_THUMB_SIZE,
    original: [Infinity, Infinity],
    wide: [1280, 474],
    lg: [1280, 474],
    md: [720, 405],
    sm: [864, 486],
    xs: [640, 360],
  },
  product: {
    thumb: DEFAULT_THUMB_SIZE,
    original: [Infinity, Infinity],
    wide: [520, 624],
    lg: [520, 624],
    md: [520, 624],
    sm: [390, 468],
    xs: [260, 312],
  },
  resource: {
    thumb: DEFAULT_THUMB_SIZE,
    original: [Infinity, Infinity],
    wide: [710, 710],
    lg: [710, 710],
    md: [710, 710],
    sm: [540, 540],
    xs: [360, 360],
  },
  hobby: {
    thumb: DEFAULT_THUMB_SIZE,
    original: [Infinity, Infinity],
    wide: [710, 710],
    lg: [710, 710],
    md: [710, 710],
    sm: [540, 540],
    xs: [360, 360],
  },
  group: {
    thumb: DEFAULT_THUMB_SIZE,
    original: [Infinity, Infinity],
    wide: [710, 710],
    lg: [710, 710],
    md: [710, 710],
    sm: [540, 540],
    xs: [360, 360],
  },
};

export const DEFAULT_EVENT_IMAGE: IResponsiveImage = {
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
  preset: 'event',
};
