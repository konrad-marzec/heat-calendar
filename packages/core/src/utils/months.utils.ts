import { MONTHS_IN_YEAR } from '../constants/month.constants';
import { DAYS_IN_WEEK } from '../constants/week.constants';

export function getMonthLastDay(year: number, month: number) {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

export function getMonthName(month: number, locale: string) {
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(Date.UTC(2000, month, 1)));
}

export function reshuffleMonths(start = new Date().getUTCMonth()) {
  const futureMonths: Array<number> = [];
  for (let i = start; i >= 0; i--) {
    futureMonths.unshift(i);
  }

  const pastMonths: Array<number> = [];
  for (let i = start + 1; i < MONTHS_IN_YEAR; i++) {
    pastMonths.push(i);
  }

  return [...pastMonths, ...futureMonths];
}

export function countWeeks(year: number, month: number) {
  const startDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const endDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDay();

  let count = 0;
  let daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  if (startDay !== 1) {
    count += 1;
    daysInMonth -= DAYS_IN_WEEK - ((startDay || DAYS_IN_WEEK) - 1);
  }

  if (endDay !== 0) {
    count += 1;
    daysInMonth -= endDay;
  }

  return count + Math.floor(daysInMonth / 7);
}
