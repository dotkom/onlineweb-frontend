import React from 'react';
import { CheckMark, Circle, CircleCheck, DividerBar } from './ClassProgress';

export interface IProps {
  ongoingYear: number;
  completedYear: number;
}

class Progress extends React.Component<IProps> {
  public render() {
    const { ongoingYear, completedYear } = this.props;

    const scale = 100 / 480;
    const lineWidth = 4 * scale;
    const radius = (40 / 2) * scale;
    const checkRadius = (24 / 2) * scale;
    const offset = 10;
    const sectionSpace = 60 * scale - radius * 2;

    const Year = ({ year = 0 }) => {
      let x = offset + radius * 4 * (year - 1);

      if (year > 3) {
        x += sectionSpace;
      }
      if (year > 5) {
        x += sectionSpace;
      }

      return (
        <>
          <g>
            <text x={x-1.333} y="5" fontSize="5">{ year }</text>
            <Circle x={x} radius={radius} lineWidth={lineWidth} />
            {year <= ongoingYear && <CircleCheck x={x} radius={checkRadius} />}
            {year <= completedYear && <CheckMark x={x} radius={checkRadius} />}
          </g>
        </>
      );
    };

    return (
      <svg width="100%" height="100%" viewBox="0 0 112 20">
        <rect x="10" y={12 - lineWidth / 2} width="90" height={lineWidth} />
        <Year year={1} />
        <Year year={2} />
        <Year year={3} />
        <DividerBar offset={offset} radius={radius} scale={scale} lineWidth={lineWidth} a={4.5} b={30} />
        <Year year={4} />
        <Year year={5} />
        <DividerBar offset={offset} radius={radius} scale={scale} lineWidth={lineWidth} a={7.5} b={90} />
        <Year year={6} />
      </svg>
    );
  }
}

export default Progress;
