export enum OrderSide {
  Unknown = 0,
  Buy = 1,
  Sell = 2,
}

export enum OrderType {
  Instant = 1,
  LimitOrder = 2,
  StopOrder = 3,
}

export type OrderTypeDetail = {
  text: string;
  type: OrderType;
  hint: string;
}

export const buyingOrderAvailableTypes: OrderTypeDetail[] = [
  {
    text: $localize`:@@stock.model.Instant:Instant`,
    type: OrderType.Instant,
    hint: $localize`:@@stock.model.Buy-at-the-current-market-price:Buy at the current market price`,
  },
  {
    text: $localize`:@@stock.model.Limit-order:Limit order`,
    type: OrderType.LimitOrder,
    hint: $localize`:@@stock.model.Buy-if-it-falls-to-a-lower-price:Buy if it falls to a lower price`,
  },
  {
    text: $localize`:@@stock.model.Stop-order:Stop order`,
    type: OrderType.StopOrder,
    hint: $localize`:@@stock.model.Buy-if-it-rises-to-higher-price:Buy if it rises to higher price`,
  },
];