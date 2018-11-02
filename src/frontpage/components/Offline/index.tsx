import React, { Component } from 'react';
import { getOfflines } from '../../api/offline';
import { IOfflineIssue } from '../../models/Offline';
import CarouselArrow from './CarouselArrow';
import OfflineCarousel from './OfflineCarousel';
import Heading from '../Heading';
import style from './carousel.less';

export interface IProps {}

export interface IState {
  offlines: IOfflineIssue[];
  index: number;
  page: number;
  loadAll: boolean;
}

const DISPLAY_NUMBER = 5;

class Offline extends Component<IProps, IState> {
  public state: IState = {
    offlines: [],
    index: 0,
    page: 1,
    loadAll: true,
  };

  public async componentDidMount() {
    const { page } = this.state;
    const offlines = await getOfflines(page);
    this.setState({ offlines });
  }

  public async fetchAll() {
    this.setState({});
  }

  public async clickNext(amount: number) {
    const { index, offlines, loadAll } = this.state;
    if (loadAll) {
      this.fetchAll();
      this.setState({ loadAll: false });
    }
    const i = index + amount;
    if (i >= 0 && i <= offlines.length) {
      this.setState({ index: i });
    }
  }

  public render() {
    const { offlines, index, page } = this.state;
    const start = index;
    const end = start + DISPLAY_NUMBER;
    return (
      <section>
        <Heading title="offline" />
        {offlines.length ? (
          <>
            <CarouselArrow
              direction="left"
              onClick={() => this.clickNext(-1)}
              disabled={index === 0}
            />
            <OfflineCarousel
              offlines={offlines.slice(index, index + DISPLAY_NUMBER)}
            />
            <CarouselArrow
              direction="right"
              onClick={() => this.clickNext(1)}
              disabled={end === offlines.length}
            />
          </>
        ) : null}
      </section>
    );
  }
}

export default Offline;
