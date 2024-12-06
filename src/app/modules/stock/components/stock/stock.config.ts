import { CryptoInfo, TimeFrame } from './stock.model';

export const defaultDisplayCrypto: CryptoInfo = {
  code: 'BTC',
  name: 'Bitcoin (BTC)',
  value: 'btc',
};

export const defaultTimeFrameIndex: number = 0;

const now = new Date();
const startDate = new Date();
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);
startDate.setMilliseconds(0);

const endDate = new Date();
endDate.setHours(23);
endDate.setMinutes(59);
endDate.setSeconds(59);
endDate.setMilliseconds(99);

const oneDayDateFrom = new Date(startDate)
oneDayDateFrom.setDate(now.getDate() - 1);

const oneWeekDateFrom = new Date(startDate)
oneWeekDateFrom.setDate(now.getDate() - 7);

const oneMonthDateFrom = new Date(startDate)
oneMonthDateFrom.setDate(now.getDate() - 31);

const sixMonthsDateFrom = new Date(startDate)
sixMonthsDateFrom.setDate(now.getDate() - 184);

const yearTodayMonthsDateFrom = new Date(startDate)
yearTodayMonthsDateFrom.setMonth(0);
yearTodayMonthsDateFrom.setDate(1);

const oneYearMonthsDateFrom = new Date(startDate)
oneYearMonthsDateFrom.setFullYear(oneYearMonthsDateFrom.getFullYear() -  1);

const fiveYearMonthsDateFrom = new Date(startDate)
fiveYearMonthsDateFrom.setFullYear(fiveYearMonthsDateFrom.getFullYear() -  5);

export const timeFrames: TimeFrame[] = [
  {
    badge: '1D',
    dateFrom: oneDayDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '1W',
    dateFrom: oneWeekDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '1M',
    dateFrom: oneMonthDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '6M',
    dateFrom: sixMonthsDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: 'YTD',
    dateFrom: yearTodayMonthsDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '1Y',
    dateFrom: oneYearMonthsDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '5Y',
    dateFrom: fiveYearMonthsDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: 'All',
    dateFrom: undefined,
    dateTo: new Date(endDate),
  },
];
