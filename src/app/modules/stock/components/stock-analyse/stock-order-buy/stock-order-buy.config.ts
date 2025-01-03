import { OrderSide, orderSidesMapReverse, orderSidesStringFiatWalletOperationPrefixMap, OrderStatus, orderStatusesMapReverse, OrderStatusLongString, OrderType } from './stock-order-buy.model';

export const defaultOrderType: OrderType = OrderType.Instant;

export const getOrderHistoryEntrySideLabel = (orderSide: string): string => {
  return OrderSide[orderSidesMapReverse.get(orderSide) as OrderSide] ?? $localize`:@@stock-order-buy-config.UNDEFINED:UNDEFINED`;
}

export const getOrderHistoryEntryStatusLabel = (orderStatus: string): string => {
  return OrderStatus[orderStatusesMapReverse.get(orderStatus as OrderStatusLongString) as OrderStatus] ?? $localize`:@@stock-order-buy-config.UNDEFINED:UNDEFINED`;
}

export const getOrderHistoryEntryCashQuantityPrefixLabel = (orderSide: string): string => {
  return orderSidesStringFiatWalletOperationPrefixMap.get(orderSide) ?? '';
}
