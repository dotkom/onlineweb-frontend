export interface IHobbyGroup {
  title: string;
  description: string;
  image: HobbyGroupImage | null;
  read_more_link: string;
  priority?: number;
  active: boolean;
}

export interface HobbyGroupImage {
  asset: ImageAsset;
}

export interface ImageAsset {
  url: string;
}
