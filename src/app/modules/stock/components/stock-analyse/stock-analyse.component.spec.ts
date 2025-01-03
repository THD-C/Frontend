import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAnalyseComponent } from './stock-analyse.component';

describe('StockComponent', () => {
  let component: StockAnalyseComponent;
  let fixture: ComponentFixture<StockAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockAnalyseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
