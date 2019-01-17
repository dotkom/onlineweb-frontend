import React, { Component, ReactNode } from 'react';
import style from './hoverCard.less';

export interface IProps {
  card: ReactNode;
  offsetX?: number;
  offsetY?: number;
}

export interface IState {
  x: number;
  y: number;
  open: boolean;
}

const BASE_OFFSET_X = 40;
const BASE_OFFSET_Y = 40;

/**
 * @summary Displays a hovering card following the pointer when the wrapped element is hovered.
 * @param card The card which will be displayed when the wrapped element is hovered.
 * @param offsetX Offset on the X-axis to place the hovering card relative to the pointer.
 * @param offsetY Offset on the Y-axis to place the hovering card relative to the pointer.
 */
class HoverCard extends Component<IProps, IState> {
  public state: IState = {
    x: 0,
    y: 0,
    open: false,
  };

  /* For performance reasons, mouse position will only be captured when mouse hovers this element */
  public mouseEnter = () => {
    document.addEventListener('mousemove', this.captureMousePosition);
    this.setState({ open: true });
  };

  public mouseLeave = () => {
    document.removeEventListener('mousemove', this.captureMousePosition);
    this.setState({ open: false });
  };

  public captureMousePosition = (event: MouseEvent) => {
    this.setState({ x: event.screenX, y: event.screenY });
  };

  public componentWillUnmount() {
    this.mouseLeave();
  }

  public render() {
    const { children } = this.props;
    const { open } = this.state;
    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        {open ? <Card {...this.state} {...this.props} /> : null}
        {children}
      </div>
    );
  }
}

/**
 * @summary A card displayed above other content. Placed at a fixed position in the viewport.
 */
export const Card = ({ x, y, card, offsetX = 0, offsetY = 0 }: IProps & IState) => {
  const top = y - BASE_OFFSET_Y - offsetY;
  const left = x - BASE_OFFSET_X - offsetX;
  return (
    <div className={style.container} style={{ top, left }}>
      {card}
    </div>
  );
};

export default HoverCard;
