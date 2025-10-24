import React, { CSSProperties, memo, useCallback, useMemo, useRef, useState } from 'react';
import cls from './VirtualizedSpanGrid.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type SpanCell = {
  key: string;
  row: number;
  col: number;
  rowSpan?: number;
  colSpan?: number;
  width: number; // intrinsic width of one column unit
  height: number; // intrinsic height of one row unit
};

type GridMeasure = {
  totalRows: number;
  totalCols: number;
  rowHeights: number[]; // per row base height
  colWidths: number[]; // per col base width
};

export interface VirtualizedSpanGridProps {
  className?: string;
  width: number; // viewport width in px
  height: number; // viewport height in px
  overscan?: number; // extra rows/cols to render
  measure: GridMeasure;
  // EITHER provide a static list of cells, OR a callback to fetch cells in the visible window
  // If a cell is covered by a span from another cell, skip it in your data provider to avoid duplicates.
  cells?: SpanCell[];
  getCells?: (args: {
    startRowIdx: number;
    endRowIdx: number;
    startColIdx: number;
    endColIdx: number;
  }) => SpanCell[];
  renderCell?: (cell: SpanCell) => React.ReactNode;
}

function accumulate(values: number[]): number[] {
  const out = new Array(values.length + 1);
  out[0] = 0;
  for (let i = 0; i < values.length; i += 1) {
    out[i + 1] = out[i] + values[i];
  }
  return out as number[];
}

function binarySearchLE(prefix: number[], target: number): number {
  // returns largest index i such that prefix[i] <= target
  let lo = 0;
  let hi = prefix.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2);
    if (prefix[mid] <= target) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

export const VirtualizedSpanGrid: React.FC<VirtualizedSpanGridProps> = memo(
  ({ className, width, height, overscan = 2, measure, cells, getCells, renderCell }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const rowPrefix = useMemo(() => accumulate(measure.rowHeights), [measure.rowHeights]);
    const colPrefix = useMemo(() => accumulate(measure.colWidths), [measure.colWidths]);
    const contentHeight = rowPrefix[rowPrefix.length - 1];
    const contentWidth = colPrefix[colPrefix.length - 1];

    const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      setScrollTop(el.scrollTop);
      setScrollLeft(el.scrollLeft);
    }, []);

    // Determine visible row/col window
    const startRowIdx = Math.max(0, binarySearchLE(rowPrefix, scrollTop) - overscan);
    const endRowIdx = Math.min(
      measure.totalRows,
      binarySearchLE(rowPrefix, scrollTop + height) + overscan
    );
    const startColIdx = Math.max(0, binarySearchLE(colPrefix, scrollLeft) - overscan);
    const endColIdx = Math.min(
      measure.totalCols,
      binarySearchLE(colPrefix, scrollLeft + width) + overscan
    );

    // Retrieve cells for the visible window
    const visibleCells = useMemo(() => {
      if (getCells) {
        return getCells({ startRowIdx, endRowIdx, startColIdx, endColIdx });
      }
      if (!cells) return [] as SpanCell[];
      return cells.filter((cell) => {
        const r1 = cell.row;
        const r2 = cell.row + (cell.rowSpan ?? 1);
        const c1 = cell.col;
        const c2 = cell.col + (cell.colSpan ?? 1);
        return r2 > startRowIdx && r1 < endRowIdx && c2 > startColIdx && c1 < endColIdx;
      });
    }, [cells, getCells, startRowIdx, endRowIdx, startColIdx, endColIdx]);

    const gridStyle: CSSProperties = useMemo(() => {
      const top = rowPrefix[startRowIdx];
      const left = colPrefix[startColIdx];
      const rowsHeights = measure.rowHeights
        .slice(startRowIdx, endRowIdx)
        .map((h) => `${h}px`)
        .join(' ');
      const colsWidths = measure.colWidths
        .slice(startColIdx, endColIdx)
        .map((w) => `${w}px`)
        .join(' ');
      return {
        top,
        left,
        gridTemplateRows: rowsHeights,
        gridTemplateColumns: colsWidths,
      } as CSSProperties;
    }, [rowPrefix, colPrefix, startRowIdx, endRowIdx, startColIdx, endColIdx, measure]);

    const render = useCallback(
      (cell: SpanCell) => {
        const rowOffset = cell.row - startRowIdx;
        const colOffset = cell.col - startColIdx;
        const maxRowSpan = Math.max(1, endRowIdx - cell.row);
        const maxColSpan = Math.max(1, endColIdx - cell.col);
        const spanRows = Math.min(cell.rowSpan ?? 1, maxRowSpan);
        const spanCols = Math.min(cell.colSpan ?? 1, maxColSpan);
        const style: CSSProperties = {
          gridRow: `${rowOffset + 1} / span ${spanRows}`,
          gridColumn: `${colOffset + 1} / span ${spanCols}`,
          width: '100%',
          height: '100%',
        };
        return (
          <div key={cell.key} className={cls.VirtualizedSpanGridCell} style={style}>
            {renderCell ? renderCell(cell) : `${cell.row},${cell.col}`}
          </div>
        );
      },
      [renderCell, startRowIdx, startColIdx, endRowIdx, endColIdx]
    );

    return (
      <div
        ref={scrollRef}
        className={classNames(cls.VirtualizedSpanGridContainer, {}, [className])}
        style={{ width, height }}
        onScroll={onScroll}
      >
        <div
          className={cls.VirtualizedSpanGridSpacer}
          style={{ width: contentWidth, height: contentHeight }}
        >
          <div className={cls.VirtualizedSpanGridViewportGrid} style={gridStyle}>
            {visibleCells.map(render)}
          </div>
        </div>
      </div>
    );
  }
);

VirtualizedSpanGrid.displayName = 'VirtualizedSpanGrid';
