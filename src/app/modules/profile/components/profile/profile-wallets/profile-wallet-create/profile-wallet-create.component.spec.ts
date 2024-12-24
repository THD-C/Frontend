import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWalletCreateComponent } from './profile-wallet-create.component';

describe('ProfileWalletCreateComponent', () => {
  let component: ProfileWalletCreateComponent;
  let fixture: ComponentFixture<ProfileWalletCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWalletCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileWalletCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
