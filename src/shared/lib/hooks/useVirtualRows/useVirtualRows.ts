import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

// Minimal local type to avoid external dependency
export type Size = { width: number; height: number };

// Binary Indexed Tree (Fenwick) for efficient dynamic prefix sums
class FenwickTree {
  private readonly size: number;
  private readonly tree: Float64Array;

  constructor(size: number) {
    this.size = size;
    this.tree = new Float64Array(size + 1); // 1-based
  }

  build(values: ArrayLike<number>): void {
    const n = Math.min(this.size, values.length);
    for (let i = 0; i < n; i++) {
      this.add(i, values[i]);
    }
  }

  add(index0: number, delta: number): void {
    // 0-based external -> 1-based internal
    let i = index0 + 1;
    const n = this.size + 1;
    while (i < n) {
      this.tree[i] += delta;
      i += i & -i;
    }
  }

  /** Sum of first `count` elements (0..count-1) */
  prefixSum(count: number): number {
    let i = Math.min(count, this.size);
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i;
    }
    return sum;
  }

  /** Sum of all elements */
  total(): number {
    return this.prefixSum(this.size);
  }

  /** Find the largest index i such that prefixSum(i) <= target. Returns i in [0..size]. */
  findPrefix(target: number): number {
    // Based on binary lifting over Fenwick internal representation
    let idx = 0;
    let bitMask = 1 << Math.floor(Math.log2(this.size || 1));

    let acc = 0;
    while (bitMask !== 0) {
      const next = idx + bitMask;
      if (next <= this.size && acc + this.tree[next] <= target) {
        idx = next;
        acc += this.tree[next];
      }
      bitMask >>= 1;
    }
    return idx; // count of items fitting into target height
  }
}

// rAF throttle to avoid synchronous scroll storms
function rafThrottle<T extends (...args: any[]) => void>(fn: T): T {
  let scheduled = false;
  let lastArgs: any[] | null = null;
  return function throttled(this: any, ...args: any[]) {
    lastArgs = args;
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      const currentArgs = lastArgs;
      lastArgs = null;
      if (currentArgs) fn.apply(this, currentArgs);
    });
  } as T;
}

/**
 * Optimized dynamic-height virtual rows hook.
 * - O(log n) updates and queries using Fenwick tree
 * - Single ResizeObserver shared across rows
 * - rAF-throttled scroll handler
 * - Stable viewport anchoring when rows above viewport change height
 */
export type ItemRenderer = (
  index: number,
  measureRowHeight: (element: Element | null) => void
) => React.ReactNode;

export interface UseVirtualRowsOptions {
  totalCount: number;
  estimatedRowHeight?: number; // px
  renderItem: ItemRenderer;
  measuredHeights?: number[]; // optional seed heights
  overscanPx?: number; // px
  size: Size; // viewport size { width, height }
  getRowKey?: (index: number) => string; // used for caching only
  getScrollElement: () => HTMLElement | null;
}

export function useVirtualRows({
  totalCount,
  estimatedRowHeight = 40,
  renderItem,
  measuredHeights = [],
  overscanPx = 200,
  size,
  getRowKey,
  getScrollElement,
}: UseVirtualRowsOptions) {
  // Heights and Fenwick live in refs to avoid re-renders on every micro change
  const heightsRef = useRef<number[]>([]);
  const fenwickRef = useRef<FenwickTree | null>(null);

  // Exposed state that drives rendering
  const [scrollTop, setScrollTop] = useState(0);
  const [version, setVersion] = useState(0); // bump to re-render when visible range or totals change

  // Keep latest refs for callbacks
  const scrollTopRef = useRef(0);
  scrollTopRef.current = scrollTop;

  const totalCountRef = useRef(totalCount);
  totalCountRef.current = totalCount;

  // Initialize or rebuild when totalCount changes
  useLayoutEffect(() => {
    const n = totalCount;
    const heights = new Array(n);
    for (let i = 0; i < n; i++) {
      const h = measuredHeights[i];
      heights[i] = Number.isFinite(h) && h! > 0 ? h! : estimatedRowHeight;
    }
    heightsRef.current = heights;

    const fenwick = new FenwickTree(n);
    fenwick.build(heights);
    fenwickRef.current = fenwick;

    // trigger re-render to reflect new totals
    setVersion((v) => v + 1);
  }, [totalCount, estimatedRowHeight, measuredHeights]);

  // Single shared ResizeObserver for all rows
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  if (typeof window !== 'undefined' && resizeObserverRef.current == null) {
    resizeObserverRef.current = new ResizeObserver((entries) => {
      const fenwick = fenwickRef.current;
      const heights = heightsRef.current;
      if (!fenwick || !heights) return;

      let affectedAboveViewportDelta = 0;

      for (const entry of entries) {
        const el = entry.target as Element | null;
        if (!el || !el.isConnected) continue;

        const idxAttr = el.getAttribute('data-row-index');
        if (!idxAttr) continue;
        const index = Number.parseInt(idxAttr, 10);
        if (!Number.isFinite(index) || index < 0 || index >= heights.length) continue;

        // Prefer borderBoxSize if present for more accurate sizing
        const borderSize = (Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize) as
          | { blockSize: number }
          | undefined;
        const newHeight = Math.max(0, Math.round(borderSize?.blockSize ?? el.getBoundingClientRect().height));

        const oldHeight = heights[index];
        if (newHeight === oldHeight) continue;

        // Compute offsetTop before update to decide if we need to anchor scroll
        const offsetTopBefore = fenwick.prefixSum(index);

        const delta = newHeight - oldHeight;
        heights[index] = newHeight;
        fenwick.add(index, delta);

        // If row is strictly above current viewport, we anchor to keep content stable
        if (offsetTopBefore + oldHeight <= scrollTopRef.current) {
          affectedAboveViewportDelta += delta;
        }
      }

      if (affectedAboveViewportDelta !== 0) {
        const scroller = getScrollElement();
        if (scroller) {
          requestAnimationFrame(() => {
            scroller.scrollBy(0, affectedAboveViewportDelta);
          });
        }
      }

      // Trigger a render to refresh visible range/paddings
      if (entries.length > 0) setVersion((v) => v + 1);
    });
  }

  const measureRowHeight = useCallback((element: Element | null) => {
    const ro = resizeObserverRef.current;
    if (!element || !ro) return;
    // Observe once; ResizeObserver handles future updates
    try {
      ro.observe(element as Element);
    } catch {
      // ignore
    }
  }, []);

  // rAF-throttled scroll handler
  const onScroll = useMemo(
    () =>
      rafThrottle((e: React.UIEvent<HTMLElement>) => {
        const target = e.currentTarget as HTMLElement;
        const top = target.scrollTop;
        setScrollTop(top);
      }),
    []
  );

  // Compute visible window using Fenwick (O(log n))
  const fenwick = fenwickRef.current;
  const totalHeight = fenwick ? fenwick.total() : 0;

  const start = useMemo(() => {
    if (!fenwick) return 0;
    const startCount = fenwick.findPrefix(Math.max(0, scrollTop - overscanPx));
    // startCount is the number of fully scrolled-out items; it's also the start index
    return Math.min(Math.max(0, startCount), totalCountRef.current ? totalCountRef.current - 1 : 0);
  }, [fenwick, scrollTop, overscanPx]);

  const end = useMemo(() => {
    if (!fenwick) return 0;
    const limit = scrollTop + size.height + overscanPx;
    // find first index where prefixSum(count) > limit, then subtract 1
    const count = fenwick.findPrefix(limit);
    const lastIndex = totalCountRef.current - 1;
    return Math.min(lastIndex, Math.max(start, count));
  }, [fenwick, scrollTop, size.height, overscanPx, start]);

  const topOffset = useMemo(() => (fenwick ? fenwick.prefixSum(start) : 0), [fenwick, start]);
  const bottomPadding = useMemo(() => {
    if (!fenwick) return 0;
    const afterEnd = fenwick.prefixSum(end + 1);
    return Math.max(0, fenwick.total() - afterEnd);
  }, [fenwick, end]);

  // Render visible rows only
  const visibleRows = useMemo(() => {
    const rows: React.ReactNode[] = [];
    const lastIndex = Math.max(start, end);
    for (let i = start; i <= lastIndex; i++) {
      rows.push(renderItem(i, measureRowHeight));
    }
    return rows;
  }, [start, end, renderItem, measureRowHeight, version]);

  // Expose debug information if needed
  const startIndex = start;
  const endIndex = end;

  return {
    onScroll,
    topOffset,
    visibleRows,
    bottomPadding,
    totalHeight,
    startIndex,
    endIndex,
    measureRowHeight,
  } as const;
}
