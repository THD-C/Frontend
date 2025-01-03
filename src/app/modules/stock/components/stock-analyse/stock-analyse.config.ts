import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { Currency } from '../../../profile/components/profile/profile-wallets/profile-wallets.config';
import { ChartType, CryptoDetails, TimeFrame } from './stock-analyse.model';

export const defaultCrypto: Currency = {
  currency_name: 'bitcoin',
};

export const defaultCryptoDetails: CryptoDetails = {
  id: '',
  market_data: {
    price_change_percentage_24h_in_currency: 0,
    total_volume: 0,
    high_24h: 0,
    market_cap: 0,
    current_price: 0,
    low_24h: 0,
    price_change_24h_in_currency: 0,
  },
  symbol: '',
  name: '',
}

export const defaultTimeFrameIndex: number = 0;

const now = new Date();
const startDate = new Date();
startDate.setHours(startDate.getHours() - 1);

const endDate = new Date();
endDate.setHours(endDate.getHours() - 1);

const oneDayDateFrom = new Date(startDate);
oneDayDateFrom.setDate(now.getDate() - 1);

const oneWeekDateFrom = new Date(startDate);
oneWeekDateFrom.setDate(now.getDate() - 7);

const oneMonthDateFrom = new Date(startDate);
oneMonthDateFrom.setDate(now.getDate() - 30);

const sixMonthsDateFrom = new Date(startDate)
sixMonthsDateFrom.setDate(now.getDate() - 180);

const yearTodayMonthsDateFrom = new Date(startDate);
yearTodayMonthsDateFrom.setDate(1);
yearTodayMonthsDateFrom.setMonth(0);
yearTodayMonthsDateFrom.setHours(0);
yearTodayMonthsDateFrom.setMinutes(0);
yearTodayMonthsDateFrom.setSeconds(0);
yearTodayMonthsDateFrom.setMilliseconds(0);

const oneYearMonthsDateFrom = new Date(startDate);
oneYearMonthsDateFrom.setDate(now.getDate() - 365);

// const fiveYearMonthsDateFrom = new Date(startDate);
// fiveYearMonthsDateFrom.setFullYear(fiveYearMonthsDateFrom.getFullYear() -  5);

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
  // Free CoinGeckoAPI does not support time frame more than 1 year :(
  // {
  //   badge: '5Y',
  //   dateFrom: fiveYearMonthsDateFrom,
  //   dateTo: new Date(endDate),
  // },
  // {
  //   badge: 'All',
  //   dateFrom: undefined,
  //   dateTo: new Date(endDate),
  // },
];

export const dxChartButtonMenuOptions: DxButtonTypes.Properties = {
  useSubmitBehavior: false,
  stylingMode: 'text',
  type: 'normal',
};

export const stockQueryParamNames = {
  coin_id: 'coin_id',
  currency: 'currency',
};

export const defaultChartType: ChartType = {
  text: $localize`:@@stock-analyse.Candlestick:Candlestick`,
  value: 'candlestick',
};
