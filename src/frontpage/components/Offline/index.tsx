import Heading from 'common/components/Heading';
import { IOfflineIssuesState, OfflineContext } from 'frontpage/providers/OfflineIssues';
import React, { Component } from 'react';
import { getOfflines, getRemaindingOfflines } from '../../api/offline';

import { IOfflineIssue } from '../../models/Offline';
import CarouselArrow from './CarouselArrow';
import style from './offline.less';
import OfflineCarousel from './OfflineCarousel';

export interface IProps {}

export interface IState {
  dataRemainding: boolean;
  offlines: IOfflineIssue[];
  index: number;
  page: number;
}

const DISPLAY_NUMBER = 5;

class Offline extends Component<IProps, IState> {
  public static contextType = OfflineContext;
  public state: IState = {
    dataRemainding: false,
    offlines: [],
    index: 0,
    page: 1,
  };

  public async componentDidMount() {
    const data = await getOfflines(1);
    const { init }: IOfflineIssuesState = this.context;
    init();

    this.setState({
      dataRemainding: Boolean(data.next),
      offlines: data.results,
    });
  }

  public handleNext = async () => {
    if (this.state.dataRemainding) {
      const remainding = await getRemaindingOfflines();

      this.setState({
        offlines: [...this.state.offlines, ...remainding],
        dataRemainding: false,
      });
    }

    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  public handlePrevious = async () => {
    this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
  };

  public render() {
    const { offlines, page } = this.state;
    const lastPage = Math.ceil(offlines.length / DISPLAY_NUMBER);
    const visibleOfflines = offlines.slice(DISPLAY_NUMBER * (page - 1), DISPLAY_NUMBER * page);
    /*
    const { index } = this.state;
    const { offlines }: IOfflineIssuesState = this.context;
    const start = index;
    const end = start + DISPLAY_NUMBER;
    */
    return (
      <section className={style.container}>
        <Heading title="Offline" />

        <div className={style.carouselContainer}>
          {offlines && (
            <>
              <CarouselArrow direction="left" onClick={this.handlePrevious} disabled={page === 1} />

              <OfflineCarousel offlines={visibleOfflines} />

              <CarouselArrow direction="right" onClick={this.handleNext} disabled={page === lastPage} />
            </>
          )}
        </div>
      </section>
    );
  }
}

export default Offline;
