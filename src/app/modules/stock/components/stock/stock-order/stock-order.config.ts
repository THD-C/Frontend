import { ButtonType } from 'devextreme/common';
import { orderAvailableTypes, OrderSide, orderSideTitles, OrderType, OrderTypeDetail } from './stock-order.model';

export const getOrderButtonTypeType = (orderType: OrderType, selectedOrderType: OrderType): ButtonType => {
  return orderType === selectedOrderType ? 'default' : 'normal';
}

export const defaultOrderType: OrderType = OrderType.Instant;

export const getOrderAvailableTypes = (orderSide: OrderSide): OrderTypeDetail[] => {
  return orderAvailableTypes.get(orderSide) ?? [];
}

export const getPopupTitle = (orderSide: OrderSide): string => {
  return orderSideTitles.get(orderSide) ?? $localize`:@@stock-order-config.Execute-market-order:Execute market order`;
}
