import { IsoDateTime } from "common/models/Date";
import { MediaUrl } from "common/models/Url";

export interface ICompanyImage {
  id: number;
  xs: MediaUrl;
  sm: MediaUrl;
  md: MediaUrl;
  lg: MediaUrl;
  timestamp: IsoDateTime;
  thumb: MediaUrl;
  original: MediaUrl;
  wide: MediaUrl;
  tags: any[];
  photographer: string; //Userprofile?
}
