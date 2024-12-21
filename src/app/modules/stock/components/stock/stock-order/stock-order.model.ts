export enum OrderSide {
  Undefined = 0,
  Buy = 1,
  Sell = 2,
}

export enum OrderType {
  Undefined = 0,
  TakeProfit = 1,
  StopLoss = 2,
  Instant = 3,
  Pending = 4,
}

export type OrderTypeDetail = {
  text: string;
  type: OrderType;
  hint: string;
}

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

export type ConfirmOrderRequest = {
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

  /**
   * Based on {@link OrderSide} and {@link orderSideStringMap}
   */
  side: string;
};

export type GetOrdersResponse = {
  orders: OrderTypeDetail
}

export const orderTypeStringMap: Map<OrderType, string> = new Map([
  /**
   * Used on buy and sell
   */
  [OrderType.Instant, 'ORDER_TYPE_INSTANT'],
  /**
   * Used only in sell
   */
  [OrderType.StopLoss, 'ORDER_TYPE_STOP_LOSS'],
  /**
   * Used only in sell
   */
  [OrderType.TakeProfit, 'ORDER_TYPE_TAKE_PROFIT'],
  /**
   * Used only in buy
   */
  [OrderType.Pending, 'ORDER_TYPE_PENDING'],
]);

export const buyOrderAvailableTypes: OrderTypeDetail[] = [
  {
    text: $localize`:@@stock.model.Instant:Instant`,
    type: OrderType.Instant,
    hint: $localize`:@@stock.model.Buy-at-the-current-market-price:Buy at the current market price`,
  },
  {
    text: $localize`:@@stock.model.Pending:Pending`,
    type: OrderType.StopLoss,
    hint: $localize`:@@stock.model.Buy-if-it-rises-or-falls-to-specific-price:Buy if it rises or falls to specific price`,
  },
];

export const sellOrderAvailableTypes: OrderTypeDetail[] = [
  {
    text: $localize`:@@stock.model.Instant:Instant`,
    type: OrderType.Instant,
    hint: $localize`:@@stock.model.Sell-at-the-current-market-price:Sell at the current market price`,
  },
  {
    text: $localize`:@@stock.model.Take-profit:Take profit`,
    type: OrderType.TakeProfit,
    hint: $localize`:@@stock.model.Sell-if-it-rises-to-higher-price:Sell if it rises to higher price`,
  },
  {
    text: $localize`:@@stock.model.Stop-loss:Stop loss`,
    type: OrderType.StopLoss,
    hint: $localize`:@@stock.model.Sell-if-it-falls-to-lower-price:Sell if it falls to lower price`,
  },
];

export const orderAvailableTypes: Map<OrderSide, OrderTypeDetail[]> = new Map([
  [OrderSide.Buy, [...buyOrderAvailableTypes]],
  [OrderSide.Sell, [...sellOrderAvailableTypes]],
]);

export const orderSideTitles: Map<OrderSide, string> = new Map([
  [OrderSide.Buy, $localize`:@@stock-order-config.Buy-order:Buy order`],
  [OrderSide.Sell, $localize`:@@stock-order-config.Sell-order:Sell order`],
]);

export const orderSideStringMap: Map<OrderSide, string> = new Map([
  [OrderSide.Buy, 'ORDER_SIDE_BUY'],
  [OrderSide.Sell, 'ORDER_SIDE_SELL'],
]);
