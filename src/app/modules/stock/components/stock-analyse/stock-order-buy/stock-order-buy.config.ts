import { DecimalPipe } from '@angular/common';
import { OrderSide, orderSidesMapReverse, orderSidesStringFiatWalletOperationPrefixMap, OrderStatus, orderStatusesMapReverse, OrderStatusLongString, OrderType } from './stock-order-buy.model';
import { inject } from '@angular/core';
import { Wallet } from '../../../../profile/components/profile/profile-wallets/profile-wallets.model';

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

export const getWalletFieldLabel = (wallet: Wallet): string => {
  const decimalPipe = inject(DecimalPipe);
  return `${wallet.currency} (${decimalPipe.transform(wallet.value, '1.2-2')})`;
}
