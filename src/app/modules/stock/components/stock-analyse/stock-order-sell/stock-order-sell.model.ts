import { OrderType, OrderTypeDetail } from '../stock-order-buy/stock-order-buy.model';

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
