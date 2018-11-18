export type Fetcher = () => Promise<any>;

export default class PrefetchState {
  public keys: string[] = [];
  public fetchers: Array<Promise<any>> = [];

  public queue = (fetcher: Fetcher, key: string) => {
    this.fetchers.push(fetcher());
    this.keys.push(key);
  };

  public get = (key: string) => {
    const index = this.keys.indexOf(key);
    return this.fetchers[index];
  };

  public has = (key: string): boolean => {
    return this.keys.indexOf(key) >= 0;
  };

  public fetchAll = async () => {
    await Promise.all(this.fetchers);
    this.fetchers.map((fetcher, i) =>
      fetcher.then((value) => {
        this.fetchers[i] = value;
      })
    );
  };

  public getData = () => {
    const data: { [key: string]: any } = {};
    for (let i = 0; i < this.keys.length; i++) {
      data[this.keys[i]] = this.fetchers[i];
    }
    return data;
  };

  public serialize = () => {
    const data = JSON.parse(window.__PREFETCHED_STATE__);
    Object.keys(data).forEach((key) => {
      this.keys.push(key);
      this.fetchers.push(data[key]);
    });
  };
}
