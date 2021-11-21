interface Image {
  title: string;
  url: string;
}
export interface IOfflineIssue {
  _id: number;
  issue: string;
  release_date: string;
  title: string;
  image: Image;
}
