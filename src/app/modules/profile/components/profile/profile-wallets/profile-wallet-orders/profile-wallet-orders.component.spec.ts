import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWalletOrdersComponent } from './profile-wallet-orders.component';

describe('ProfileWalletOrdersComponent', () => {
  let component: ProfileWalletOrdersComponent;
  let fixture: ComponentFixture<ProfileWalletOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWalletOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileWalletOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
