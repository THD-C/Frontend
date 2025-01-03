import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOrderSellComponent } from './stock-order-sell.component';

describe('StockOrderSellComponent', () => {
  let component: StockOrderSellComponent;
  let fixture: ComponentFixture<StockOrderSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockOrderSellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockOrderSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
