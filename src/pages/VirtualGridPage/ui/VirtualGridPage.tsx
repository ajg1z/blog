import React, { memo, useMemo } from 'react';
import { PageWrapper } from '@/widgets/PageWrapper';
import { VirtualizedSpanGrid } from '@/shared/ui/VirtualizedSpanGrid';

const ROWS = 2000;
const COLS = 1000;

function generateMeasure() {
  const rowHeights = Array.from({ length: ROWS }, (_, r) => (r % 10 === 0 ? 48 : 32));
  const colWidths = Array.from({ length: COLS }, (_, c) => (c % 8 === 0 ? 160 : 100));
  return { totalRows: ROWS, totalCols: COLS, rowHeights, colWidths };
}

const VirtualGridPage = memo(() => {
  const measure = useMemo(generateMeasure, []);
  const getCells = ({ startRowIdx, endRowIdx, startColIdx, endColIdx }: {
    startRowIdx: number; endRowIdx: number; startColIdx: number; endColIdx: number;
  }) => {
    const cells: Array<{ key: string; row: number; col: number; rowSpan?: number; colSpan?: number; width: number; height: number; }> = [];
    const covered = new Set<string>();
    for (let r = startRowIdx; r < endRowIdx; r += 1) {
      for (let c = startColIdx; c < endColIdx; c += 1) {
        const k = `${r}_${c}`;
        if (covered.has(k)) continue;
        let rowSpan: number | undefined;
        let colSpan: number | undefined;
        if (r % 15 === 0 && c % 7 === 0) {
          rowSpan = 2; colSpan = 3;
        } else if (r % 40 === 0 && c % 11 === 0) {
          rowSpan = 3; colSpan = 2;
        }
        if (rowSpan && colSpan) {
          for (let rr = r; rr < Math.min(r + rowSpan, endRowIdx); rr += 1) {
            for (let cc = c; cc < Math.min(c + colSpan, endColIdx); cc += 1) {
              if (rr === r && cc === c) continue;
              covered.add(`${rr}_${cc}`);
            }
          }
        }
        cells.push({ key: `r${r}c${c}`, row: r, col: c, rowSpan, colSpan, width: 100, height: 32 });
      }
    }
    return cells;
  };

  return (
    <PageWrapper data-testid="VirtualGridPage">
      <div style={{ height: '80vh', padding: 16 }}>
        <VirtualizedSpanGrid width={1200} height={600} measure={measure} getCells={getCells} />
      </div>
    </PageWrapper>
  );
});

export default VirtualGridPage;
