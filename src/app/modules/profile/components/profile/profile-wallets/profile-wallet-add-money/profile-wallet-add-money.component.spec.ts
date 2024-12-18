import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWalletAddMoneyComponent } from './profile-wallet-add-money.component';

describe('ProfileWalletAddMoneyComponent', () => {
  let component: ProfileWalletAddMoneyComponent;
  let fixture: ComponentFixture<ProfileWalletAddMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWalletAddMoneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileWalletAddMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
