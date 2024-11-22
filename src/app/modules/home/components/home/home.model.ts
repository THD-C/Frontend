export const greenCandleColor: string = '#08aa54';
export const redCandleColor: string = '#f44336';

export type StockPrice = {
  date: Date;

  l: number;

  h: number;

  o: number;

  c: number;
}

export const stockPrices: StockPrice[] = [{
  date: new Date(2024, 1, 1),
  l: 24.00,
  h: 25.00,
  o: 25.00,
  c: 24.875,
}, {
  date: new Date(2024, 1, 2),
  l: 23.625,
  h: 25.125,
  o: 24.00,
  c: 24.875,
}, {
  date: new Date(2024, 1, 3),
  l: 26.25,
  h: 28.25,
  o: 26.75,
  c: 27.00,
}, {
  date: new Date(2024, 1, 4),
  l: 26.50,
  h: 27.875,
  o: 26.875,
  c: 27.25,
}, {
  date: new Date(2024, 1, 7),
  l: 26.375,
  h: 27.50,
  o: 27.375,
  c: 26.75,
}, {
  date: new Date(2024, 1, 8),
  l: 25.75,
  h: 26.875,
  o: 26.75,
  c: 26.00,
}, {
  date: new Date(2024, 1, 9),
  l: 25.75,
  h: 26.75,
  o: 26.125,
  c: 26.25,
}, {
  date: new Date(2024, 1, 10),
  l: 25.75,
  h: 26.375,
  o: 26.375,
  c: 25.875,
}, {
  date: new Date(2024, 1, 11),
  l: 24.875,
  h: 26.125,
  o: 26.00,
  c: 25.375,
}, {
  date: new Date(2024, 1, 14),
  l: 25.125,
  h: 26.00,
  o: 25.625,
  c: 25.75,
}, {
  date: new Date(2024, 1, 15),
  l: 25.875,
  h: 26.625,
  o: 26.125,
  c: 26.375,
}, {
  date: new Date(2024, 1, 16),
  l: 26.25,
  h: 27.375,
  o: 26.25,
  c: 27.25,
}, {
  date: new Date(2024, 1, 17),
  l: 26.875,
  h: 27.25,
  o: 27.125,
  c: 26.875,
}, {
  date: new Date(2024, 1, 18),
  l: 26.375,
  h: 27.125,
  o: 27.00,
  c: 27.125,
}, {
  date: new Date(2024, 1, 21),
  l: 26.75,
  h: 27.875,
  o: 26.875,
  c: 27.75,
}, {
  date: new Date(2024, 1, 22),
  l: 26.75,
  h: 28.375,
  o: 27.50,
  c: 27.00,
}, {
  date: new Date(2024, 1, 23),
  l: 26.875,
  h: 28.125,
  o: 27.00,
  c: 28.00,
}, {
  date: new Date(2024, 1, 24),
  l: 26.25,
  h: 27.875,
  o: 27.75,
  c: 27.625,
}, {
  date: new Date(2024, 1, 25),
  l: 27.50,
  h: 28.75,
  o: 27.75,
  c: 28.00,
}, {
  date: new Date(2024, 1, 28),
  l: 25.75,
  h: 28.25,
  o: 28.00,
  c: 27.25,
}, {
  date: new Date(2024, 1, 29),
  l: 26.375,
  h: 27.50,
  o: 27.50,
  c: 26.875,
}, {
  date: new Date(2024, 1, 30),
  l: 25.75,
  h: 27.50,
  o: 26.375,
  c: 26.25,
}, {
  date: new Date(2024, 1, 31),
  l: 24.75,
  h: 27.00,
  o: 26.50,
  c: 25.25,
}];

export type CryptoInfo = {
  code: string;
  name: string;
  value: string;
}

export const cryptosInfo: CryptoInfo[] = [
  { code: 'BTC', name: 'Bitcoin (BTC)', value: 'btc' },
  { code: 'ETH', name: 'Ethereum (ETH)', value: 'eth' },
  { code: 'DOGE', name: 'DogeCoin (DOGE)', value: 'doge' },
]

export type CryptoStockPrice = {
  date: Date;
  btc: number;
  eth: number;
  doge: number;
}

export const cryptoStockPrices: CryptoStockPrice[] = [
  { btc: 46000, eth: 3200, doge: 0.080, date: new Date('2024-02-01') },
  { btc: 45250, eth: 3225, doge: 0.082, date: new Date('2024-02-02') },
  { btc: 46300, eth: 3240, doge: 0.081, date: new Date('2024-02-03') },
  { btc: 43400, eth: 3255, doge: 0.083, date: new Date('2024-02-04') },
  { btc: 46550, eth: 3270, doge: 0.084, date: new Date('2024-02-05') },
  { btc: 46700, eth: 32585, doge: 0.085, date: new Date('2024-02-06') },
  { btc: 16800, eth: 3300, doge: 0.086, date: new Date('2024-02-07') },
  { btc: 66950, eth: 6325, doge: 0.087, date: new Date('2024-02-08') },
  { btc: 47100, eth: 3340, doge: 0.088, date: new Date('2024-02-09') },
  { btc: 57200, eth: 365, doge: 0.089, date: new Date('2024-02-10') },
  { btc: 47350, eth: 3380, doge: 0.090, date: new Date('2024-02-11') },
  { btc: 27500, eth: 4405, doge: 0.091, date: new Date('2024-02-12') },
  { btc: 57600, eth: 3420, doge: 0.092, date: new Date('2024-02-13') },
  { btc: 47750, eth: 3445, doge: 0.093, date: new Date('2024-02-14') },
  { btc: 87900, eth: 3460, doge: 0.094, date: new Date('2024-02-15') },
  { btc: 48000, eth: 3485, doge: 0.095, date: new Date('2024-02-16') },
  { btc: 3150, eth: 5500, doge: 0.096, date: new Date('2024-02-17') },
  { btc: 48300, eth: 3525, doge: 0.097, date: new Date('2024-02-18') },
  { btc: 38400, eth: 3540, doge: 0.098, date: new Date('2024-02-19') },
  { btc: 450, eth: 7565, doge: 0.099, date: new Date('2024-02-20') },
  { btc: 48700, eth: 3580, doge: 0.100, date: new Date('2024-02-21') },
  { btc: 68800, eth: 4605, doge: 0.101, date: new Date('2024-02-22') },
  { btc: 48950, eth: 33620, doge: 0.102, date: new Date('2024-02-23') },
  { btc: 67100, eth: 3645, doge: 0.103, date: new Date('2024-02-24') },
  { btc: 4200, eth: 32360, doge: 0.104, date: new Date('2024-02-25') },
  { btc: 49350, eth: 3685, doge: 0.105, date: new Date('2024-02-26') },
  { btc: 990, eth: 3700, doge: 0.106, date: new Date('2024-02-27') },
  { btc: 41600, eth: 3725, doge: 0.107, date: new Date('2024-02-28') },
];
