export const greenCandleColor: string = '#08aa54';
export const redCandleColor: string = '#f44336';

export class StockPrice {
  date!: Date;

  l!: number;

  h!: number;

  o!: number;

  c!: number;
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