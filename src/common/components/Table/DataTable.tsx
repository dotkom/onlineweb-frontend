import classnames from 'classnames';
import React, { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { getKeys } from 'common/utils/tsHacks';

import style from './table.less';

export type SortFunction<T> = (a: T, b: T) => number;

export type DataTableHeaders = { [key: string]: string };
export type DataTableSorters<H, T> = { [HeaderKey in keyof H]?: SortFunction<T> };

export interface IProps<T extends {}, H extends DataTableHeaders> {
  headers: H;
  title?: string;
  items: T[];
  children: (items: T[]) => ReactNode;
  sorters?: DataTableSorters<H, T>;
  displayAmount?: number;
  selectedHeader?: keyof H;
}

const BASE_SORT_FUNCTION = () => 1;
const BASE_DISPLAY_AMOUNT = 10;

export function DataTable<T extends {}, H extends {}>({
  headers,
  title,
  children,
  items,
  sorters,
  displayAmount = BASE_DISPLAY_AMOUNT,
  selectedHeader: overrideSelectedHeader,
}: IProps<T, H>) {
  /** The selected Header is chosen as the first key in the object of headers if override is undefined */
  const initialSelectedHeader = useMemo(() => overrideSelectedHeader || getKeys<H>(headers)[0], []);
  const [selectedHeader, setSelectedHeader] = useState<keyof H>(initialSelectedHeader);
  const [reversedSort, setReversedSort] = useState(false);

  const [displayAll, setDisplayAll] = useState(false);
  const toggleDisplayAll = useCallback(() => setDisplayAll((current) => !current), []);

  /** Use the sorting function for the selected header, or use the default if it is not defined */
  const sortFunction = sorters ? sorters[selectedHeader] || BASE_SORT_FUNCTION : BASE_SORT_FUNCTION;
  /** Sort items by the selected sorting function, memoize since sorting can be expensive. */
  const sortedItems = useMemo(() => items.sort(sortFunction), [selectedHeader]);
  /** Order the list by acending or descending */
  const orderedItems = reversedSort ? sortedItems.slice().reverse() : sortedItems;
  /** Cut down the displayed list as the last step, even a cut of list should be sorted. */
  const displayItems = displayAll ? orderedItems : orderedItems.slice(0, displayAmount);

  /**
   * Update the selected header from props if it is redefined.
   * Selected header can be set by the user, but if the override changes it will be updated by the app.
   */
  useEffect(() => {
    if (overrideSelectedHeader) {
      setSelectedHeader(overrideSelectedHeader);
    }
  }, [overrideSelectedHeader]);

  /** Use callback to memoize function signature since it is always the same */
  const handleHeaderClick = useCallback((clickedHeader: typeof selectedHeader) => {
    setSelectedHeader((currentSelectedHeader) => {
      if (clickedHeader === currentSelectedHeader) {
        /** Sorting direction is toggled if the selected header is clicked */
        setReversedSort((current) => !current);
      } else {
        /** Set new header as clicked and set sorting direction to default */
        setReversedSort(false);
        return clickedHeader;
      }
      return currentSelectedHeader;
    });
  }, []);

  return (
    <div className={style.container}>
      <table>
        {title ? <caption>{title}</caption> : null}
        <thead>
          <tr>
            {getKeys(headers).map((header) => (
              <th key={header as string} scope="col" onClick={() => handleHeaderClick(header)}>
                <h3 className={style.header}>{headers[header]}</h3>
                <div className={style.directionContainer}>
                  {header === selectedHeader && !reversedSort ? <Triangle /> : null}
                </div>
                <div
                  className={classnames(style.headerBorder, {
                    [style.selectedHeader]: header === selectedHeader,
                  })}
                />
                <div className={classnames(style.directionContainer, style.upsideDown)}>
                  {header === selectedHeader && reversedSort ? <Triangle /> : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children(displayItems)}</tbody>
      </table>
      <div className={style.bottomContent}>
        <button className={style.toggleButton} onClick={toggleDisplayAll}>
          {displayAll ? `Vis færre elementer (${displayAmount})` : `Vis alle elementer (${sortedItems.length})`}
        </button>
      </div>
    </div>
  );
}

const Triangle: FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 8 3">
      <path d="M4 3L0 0L8 0L4 3Z" />
    </svg>
  );
};
