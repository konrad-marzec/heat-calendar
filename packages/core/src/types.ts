export interface Dim {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Grid<T extends Dim> {
  data: T[];
  width: number;
  height: number;
}

export interface MonthsGrid extends Dim {
  year: number;
  month: number;
  weeks: number;
  key: string | number;
}

export interface WeeksGrid extends Dim {
  week: number;
  year: number;
  month: number;
  key: string | number;
}
