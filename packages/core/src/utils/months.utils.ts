import { MONTHS_IN_YEAR } from '../constants/month.constants';
import { DAYS_IN_WEEK } from '../constants/week.constants';

export function getMonthName(month: number, locale: string) {
  var format = new Intl.DateTimeFormat(locale, { month: 'long' });

  return format.format(new Date(2000, month, 1, 0, 0, 0));
}

export function reshuffleMonths(start = new Date().getMonth()) {
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
  const startDay = new Date(year, month, 1).getDay();
  const endDay = new Date(year, month + 1, 0).getDay();

  let count = 0;
  let daysInMonth = new Date(year, month + 1, 0).getDate();

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
