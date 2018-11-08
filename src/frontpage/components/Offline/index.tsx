import Heading from 'common/components/Heading';
import React, { Component } from 'react';
<<<<<<< HEAD
import { getOfflines, getRemaindingOfflines } from '../../api/offline';
=======
import { getOfflines, getServerCacheOfflines } from '../../api/offline';
>>>>>>> Implement standardized cache resolver, and implement enironment to make sure it works without SSR
import { IOfflineIssue } from '../../models/Offline';
import CarouselArrow from './CarouselArrow';
import style from './offline.less';
import OfflineCarousel from './OfflineCarousel';

export interface IProps {}

export interface IState {
  dataRemainding: boolean;
  offlines: IOfflineIssue[];
  page: number;
}

const DISPLAY_NUMBER = 5;

class Offline extends Component<IProps, IState> {
  public state: IState = {
<<<<<<< HEAD
    dataRemainding: false,
    offlines: [],
=======
    offlines: getServerCacheOfflines(),
    index: 0,
>>>>>>> Implement standardized cache resolver, and implement enironment to make sure it works without SSR
    page: 1,
  };

  public async componentDidMount() {
    const data = await getOfflines(1);

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
