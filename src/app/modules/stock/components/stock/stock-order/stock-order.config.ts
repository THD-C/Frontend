import { ButtonType } from 'devextreme/common';
import { OrderSide, OrderType, OrderTypeDetail } from './stock-order.model';

export const getOrderButtonTypeType = (orderType: OrderType, selectedOrderType: OrderType): ButtonType => {
  return orderType === selectedOrderType ? 'default' : 'normal';
}

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

export const defaultOrderType: OrderType = OrderType.Instant;

export const orderAvailableTypes: Map<OrderSide, OrderTypeDetail[]> = new Map([
  [OrderSide.Buy, [...buyOrderAvailableTypes]],
  [OrderSide.Sell, [...sellOrderAvailableTypes]],
]);

export const getOrderAvailableTypes = (orderSide: OrderSide): OrderTypeDetail[] => {
  return orderAvailableTypes.get(orderSide) ?? [];
}
