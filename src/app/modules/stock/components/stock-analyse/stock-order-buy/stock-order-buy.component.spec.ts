import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOrderBuyComponent } from './stock-order-buy.component';

describe('StockOrderBuyComponent', () => {
  let component: StockOrderBuyComponent;
  let fixture: ComponentFixture<StockOrderBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockOrderBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockOrderBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
