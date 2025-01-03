import { ButtonType } from 'devextreme/common';
import { orderAvailableTypes, OrderSide, orderSidesMapReverse, orderSidesStringFiatWalletOperationPrefixMap, orderSideTitles, OrderStatus, orderStatusesMapReverse, OrderType, OrderTypeDetail } from './stock-order-buy.model';

export const getOrderButtonTypeType = (orderType: OrderType, selectedOrderType: OrderType): ButtonType => {
  return orderType === selectedOrderType ? 'default' : 'normal';
}

export const defaultOrderType: OrderType = OrderType.Instant;

export const getOrderAvailableTypes = (orderSide: OrderSide): OrderTypeDetail[] => {
  return orderAvailableTypes.get(orderSide) ?? [];
}

export const getPopupTitle = (orderSide: OrderSide): string => {
  return orderSideTitles.get(orderSide) ?? $localize`:@@stock-order-buy-config.Execute-market-order:Execute market order`;
}

export const getOrderHistoryEntrySideLabel = (orderSide: string): string => {
  return OrderSide[orderSidesMapReverse.get(orderSide) as OrderSide] ?? $localize`:@@stock-order-buy-config.Unknown:Unknown`;
}

export const getOrderHistoryEntryStatusLabel = (orderStatus: string): string => {
  return OrderStatus[orderStatusesMapReverse.get(orderStatus) as OrderStatus] ?? $localize`:@@stock-order-buy-config.Unknown:Unknown`;
}

export const getOrderHistoryEntryCashQuantityPrefixLabel = (orderSide: string): string => {
  return orderSidesStringFiatWalletOperationPrefixMap.get(orderSide) ?? '';
}
