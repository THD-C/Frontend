export type OrderTypeDetail = {
  text: string;
  type: OrderType;
  hint: string;
}

// TODO: Change camelCase to snake_case
export type Order = {
  id: string;

  dateCreated: string;
  dateExecuted: string;

  /**
   * Based on {@link OrderStatus} and {@link orderStatusesMap}
   */
  status: string;

  /**
   * How much crypto was sold or bought
   */
  nominal: string;

  /**
   * Price at which the crypto was sold or bought
   */
  price: string;

  /**
   * How much was spent from fiat wallet
   */
  cashQuantity: string;
  
  /**
   * {@link OrderType}
   */
  type: string;

  /**
   * {@link OrderSide}
   */
  side: string;

  /**
   * Crypto currency i.e. BTC, ETH
   */
  cryptoWalletId: string;

  /**
   * Human currency i.e. USD, EUR
   */
  fiatWalletId: string;
}

export enum OrderSide {
  Undefined = 0,
  Buy = 1,
  Sell = 2,
}

export enum OrderSideString {
  Undefined = 'ORDER_SIDE_UNDEFINED',
  Buy = 'ORDER_SIDE_BUY',
  Sell = 'ORDER_SIDE_SELL',
}

export enum OrderType {
  Undefined = 0,
  TakeProfit = 1,
  StopLoss = 2,
  Instant = 3,
  Pending = 4,
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
  [OrderSide.Buy, $localize`:@@stock-order.Buy-order:Buy order`],
  [OrderSide.Sell, $localize`:@@stock-order.Sell-order:Sell order`],
]);

export const orderSidesMap: Map<OrderSide, string> = new Map([
  [OrderSide.Buy, 'ORDER_SIDE_BUY'],
  [OrderSide.Sell, 'ORDER_SIDE_SELL'],
]);

export const orderSidesMapReverse: Map<string, OrderSide> = new Map(
  Array.from(orderSidesMap, ([key, value]) => [value, key])
);

export const orderSidesStringFiatWalletOperationPrefixMap: Map<string, string> = new Map([
  [OrderSideString.Buy, '-'],
  [OrderSideString.Sell, '+'],
]);

export enum OrderStatus {
  Undefined = 0,
  Accepted = 1,
  Rejected = 2,
  Pending = 3,
  PartiallyCompleted = 5,
  Completed = 4,
  Cancelled = 6,
  Expired = 7,
  InProgress = 8,
}

export enum OrderStatusString {
  Undefined = 'ORDER_STATUS_UNDEFINED',
  Accepted = 'ORDER_STATUS_ACCEPTED',
  Rejected = 'ORDER_STATUS_REJECTED',
  Pending = 'ORDER_STATUS_PENDING',
  PartiallyCompleted = 'ORDER_STATUS_PARTIALLY_COMPLETED',
  Completed = 'ORDER_STATUS_COMPLETED',
  Cancelled = 'ORDER_STATUS_CANCELLED',
  Expired = 'ORDER_STATUS_EXPIRED',
  InProgress = 'ORDER_STATUS_IN_PROGRESS',
}

export const orderStatusesMap: Map<OrderStatus, string> = new Map([
  [OrderStatus.Undefined, 'ORDER_STATUS_UNDEFINED'],
  [OrderStatus.Accepted, 'ORDER_STATUS_ACCEPTED'],
  [OrderStatus.Rejected, 'ORDER_STATUS_REJECTED'],
  [OrderStatus.Pending, 'ORDER_STATUS_PENDING'],
  [OrderStatus.PartiallyCompleted, 'ORDER_STATUS_PARTIALLY_COMPLETED'],
  [OrderStatus.Completed, 'ORDER_STATUS_COMPLETED'],
  [OrderStatus.Cancelled, 'ORDER_STATUS_CANCELLED'],
  [OrderStatus.Expired, 'ORDER_STATUS_EXPIRED'],
  [OrderStatus.InProgress, 'ORDER_STATUS_IN_PROGRESS'],
]);

export const orderStatusesMapReverse: Map<string, OrderStatus> = new Map(
  Array.from(orderStatusesMap, ([key, value]) => [value, key])
);

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
   * Based on {@link OrderSide} and {@link orderSidesMap}
   */
  side: string;
};

export type GetOrdersRequest = {
  wallet_id?: string;

  /**
   * Based on {@link OrderStatus}
   */
  status?: string;

  /**
   * {@link OrderType}
   */
  type?: string;
  
  /**
   * Based on {@link OrderSide} and {@link orderSidesMap}
   */
  side?: string;
}

export type GetOrdersResponse = {
  orders: Order[];
}
