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

export type OrderDetails = {
  /**
   * Which currency is used i.e. BUY sth with USD, SELL BTC
   */
  currency_used_wallet_id: string;
  /**
   * Which currency is the goal i.e. buy BTC, get USD from selling BTC
   */
  currency_target: string;
  /**
   * Number of units which are going to be used of currency_used_wallet_id
   */
  nominal: number;
  cash_quantity: number;
  /**
   * Price on which user wants to perform an order
   */
  price: number;
  type: OrderType;
  side: OrderSide;
}

export type PlaceOrderRequest = {
  /**
   * Which currency is used i.e. BUY sth with USD, SELL BTC
   */
    currency_used_wallet_id: string;
    /**
     * Which currency is the goal i.e. buy BTC, get USD from selling BTC
     */
    currency_target: string;
    /**
     * Number of units which are going to be used of currency_used_wallet_id
     */
    nominal: string;
    cash_quantity: string;
    /**
     * Price on which user wants to perform an order
     */
    price: string;
    type: string;
    side: string;
};

// TODO: change to this implementation when will be fixed on back-end
// export const orderTypeStringMap: Map<OrderType, string> = new Map([
//   [OrderType.Instant, 'ORDER_TYPE_INSTANT'],
//   [OrderType.StopOrder, 'ORDER_TYPE_STOP_ORDER'],
//   [OrderType.LimitOrder, 'ORDER_TYPE_LIMIT_ORDER'],
// ]);

export const orderTypeStringMap: Map<OrderType, string> = new Map([
  [OrderType.Instant, 'ORDER_TYPE_INSTANT'],
  [OrderType.StopOrder, 'ORDER_TYPE_STOP_LOSS'],
  [OrderType.LimitOrder, 'ORDER_TYPE_TAKE_PROFIT'],
]);

export const buyOrderAvailableTypes: OrderTypeDetail[] = [
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

export const sellOrderAvailableTypes: OrderTypeDetail[] = [
  {
    text: $localize`:@@stock.model.Instant:Instant`,
    type: OrderType.Instant,
    hint: $localize`:@@stock.model.Sell-at-the-current-market-price:Sell at the current market price`,
  },
  {
    text: $localize`:@@stock.model.Limit-order:Limit order`,
    type: OrderType.LimitOrder,
    hint: $localize`:@@stock.model.Sell-if-it-rises-to-higher-price:Sell if it rises to higher price`,
  },
  {
    text: $localize`:@@stock.model.Stop-order:Stop order`,
    type: OrderType.StopOrder,
    hint: $localize`:@@stock.model.Sell-if-it-falls-to-a-lower-price:Sell if it falls to a lower price`,
  },
];

export const orderAvailableTypes: Map<OrderSide, OrderTypeDetail[]> = new Map([
  [OrderSide.Buy, [...buyOrderAvailableTypes]],
  [OrderSide.Sell, [...sellOrderAvailableTypes]],
]);

export const orderSideTitles: Map<OrderSide, string> = new Map([
  [OrderSide.Buy, $localize`:@@stock-order-config.Buy-crypto:Buy crypto`],
  [OrderSide.Sell, $localize`:@@stock-order-config.Sell-crypto:Sell crypto`],
]);

export const orderSideStringMap: Map<OrderSide, string> = new Map([
  [OrderSide.Buy, 'ORDER_SIDE_BUY'],
  [OrderSide.Sell, 'ORDER_SIDE_SELL'],
]);
