import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWalletEditComponent } from './profile-wallet-edit.component';

describe('ProfileWalletEditComponent', () => {
  let component: ProfileWalletEditComponent;
  let fixture: ComponentFixture<ProfileWalletEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWalletEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileWalletEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
