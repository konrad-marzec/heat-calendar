jest.mock('../../model/Store');

import { renderHook } from '@testing-library/react';

import { useStoreValue } from '../../model/Store';
import { useHeatMapScale } from '../use-heat-map-scale';

const GREEN_COLORS = ['#5e5e56', '#7cb305', '#5b8c00', '#3f6600'];

describe('useHeatMapScale', () => {
  it.skip('should map value to color on the positive scale', () => {
    (useStoreValue as jest.Mock).mockImplementation((fn: (store: unknown) => unknown) =>
      fn({
        colors: GREEN_COLORS,
        heatMap: new Map([
          ['2020-01-01', 12],
          ['2020-01-02', 1],
          ['2020-01-03', 4],
          ['2020-01-04', 8],
          ['2020-01-05', 0],
        ]),
      }),
    );

    const { result } = renderHook(useHeatMapScale);

    expect(result.current(-1)).toEqual(GREEN_COLORS[0]);
    expect(result.current(0)).toEqual(GREEN_COLORS[0]);
    expect(result.current(1)).toEqual(GREEN_COLORS[0]);
    expect(result.current(2)).toEqual(GREEN_COLORS[0]);
    expect(result.current(3)).toEqual(GREEN_COLORS[1]);
    expect(result.current(4)).toEqual(GREEN_COLORS[1]);
    expect(result.current(5)).toEqual(GREEN_COLORS[1]);
    expect(result.current(6)).toEqual(GREEN_COLORS[2]);
    expect(result.current(7)).toEqual(GREEN_COLORS[2]);
    expect(result.current(8)).toEqual(GREEN_COLORS[2]);
    expect(result.current(9)).toEqual(GREEN_COLORS[3]);
    expect(result.current(10)).toEqual(GREEN_COLORS[3]);
    expect(result.current(11)).toEqual(GREEN_COLORS[3]);
    expect(result.current(12)).toEqual(GREEN_COLORS[3]);
    expect(result.current(15)).toEqual(GREEN_COLORS[3]);
  });

  it('should map value to color on the mixed scale', () => {
    (useStoreValue as jest.Mock).mockImplementation((fn: (store: unknown) => unknown) =>
      fn({
        colors: GREEN_COLORS,
        heatMap: new Map([
          ['2020-01-01', 6],
          ['2020-01-02', -5],
          ['2020-01-03', -2],
          ['2020-01-04', 2],
          ['2020-01-05', -6],
        ]),
      }),
    );

    const { result } = renderHook(useHeatMapScale);

    expect(result.current(-7)).toEqual(GREEN_COLORS[0]);
    expect(result.current(-6)).toEqual(GREEN_COLORS[0]);
    expect(result.current(-5)).toEqual(GREEN_COLORS[0]);
    expect(result.current(-4)).toEqual(GREEN_COLORS[0]);
    expect(result.current(-3)).toEqual(GREEN_COLORS[1]);
    expect(result.current(-2)).toEqual(GREEN_COLORS[1]);
    expect(result.current(-1)).toEqual(GREEN_COLORS[1]);
    expect(result.current(0)).toEqual(GREEN_COLORS[2]);
    expect(result.current(1)).toEqual(GREEN_COLORS[2]);
    expect(result.current(2)).toEqual(GREEN_COLORS[2]);
    expect(result.current(3)).toEqual(GREEN_COLORS[3]);
    expect(result.current(4)).toEqual(GREEN_COLORS[3]);
    expect(result.current(5)).toEqual(GREEN_COLORS[3]);
    expect(result.current(6)).toEqual(GREEN_COLORS[3]);
    expect(result.current(15)).toEqual(GREEN_COLORS[3]);
  });

  it('should map value to color on the negative scale', () => {
    (useStoreValue as jest.Mock).mockImplementation((fn: (store: unknown) => unknown) =>
      fn({
        colors: GREEN_COLORS,
        heatMap: new Map([
          ['2020-01-01', -12],
          ['2020-01-02', -8],
          ['2020-01-03', -1],
          ['2020-01-04', -4],
          ['2020-01-05', 0],
        ]),
      }),
    );

    const { result } = renderHook(useHeatMapScale);

    expect(result.current(-15)).toEqual(GREEN_COLORS[0]);
    expect(result.current(-12)).toEqual(GREEN_COLORS[0]);
    expect(result.current(-11)).toEqual(GREEN_COLORS[0]);
    expect(result.current(-10)).toEqual(GREEN_COLORS[0]);
    expect(result.current(-9)).toEqual(GREEN_COLORS[1]);
    expect(result.current(-8)).toEqual(GREEN_COLORS[1]);
    expect(result.current(-7)).toEqual(GREEN_COLORS[1]);
    expect(result.current(-6)).toEqual(GREEN_COLORS[2]);
    expect(result.current(-5)).toEqual(GREEN_COLORS[2]);
    expect(result.current(-4)).toEqual(GREEN_COLORS[2]);
    expect(result.current(-3)).toEqual(GREEN_COLORS[3]);
    expect(result.current(-2)).toEqual(GREEN_COLORS[3]);
    expect(result.current(-1)).toEqual(GREEN_COLORS[3]);
    expect(result.current(0)).toEqual(GREEN_COLORS[3]);
    expect(result.current(5)).toEqual(GREEN_COLORS[3]);
  });

  it('should return transparent when colors not defined', () => {
    (useStoreValue as jest.Mock).mockImplementation((fn: (store: unknown) => unknown) =>
      fn({
        heatMap: new Map([
          ['2020-01-01', -12],
          ['2020-01-02', -8],
          ['2020-01-03', -1],
          ['2020-01-04', -4],
          ['2020-01-05', 0],
        ]),
      }),
    );

    const { result } = renderHook(useHeatMapScale);

    expect(result.current(-15)).toEqual('transparent');
    expect(result.current(10)).toEqual('transparent');
    expect(result.current(0)).toEqual('transparent');
  });

  it('should return first color when value is null or undefined', () => {
    (useStoreValue as jest.Mock).mockImplementation((fn: (store: unknown) => unknown) =>
      fn({
        colors: GREEN_COLORS,
        heatMap: new Map([
          ['2020-01-01', -12],
          ['2020-01-02', -8],
          ['2020-01-03', -1],
          ['2020-01-04', -4],
          ['2020-01-05', 0],
        ]),
      }),
    );

    const { result } = renderHook(useHeatMapScale);

    expect(result.current()).toEqual(GREEN_COLORS[0]);
    expect(result.current(null)).toEqual(GREEN_COLORS[0]);
  });

  it('should return first color when all values are the same', () => {
    (useStoreValue as jest.Mock).mockImplementation((fn: (store: unknown) => unknown) =>
      fn({
        colors: GREEN_COLORS,
        heatMap: new Map([
          ['2020-01-01', 2],
          ['2020-01-02', 2],
          ['2020-01-03', 2],
          ['2020-01-04', 2],
          ['2020-01-05', 2],
        ]),
      }),
    );

    const { result } = renderHook(useHeatMapScale);

    expect(result.current(1)).toEqual(GREEN_COLORS[0]);
    expect(result.current(2)).toEqual(GREEN_COLORS[0]);
    expect(result.current(3)).toEqual(GREEN_COLORS[0]);
  });
});
