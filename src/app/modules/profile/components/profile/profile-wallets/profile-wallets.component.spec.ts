import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWalletsComponent } from './profile-wallets.component';

describe('ProfileWalletsComponent', () => {
  let component: ProfileWalletsComponent;
  let fixture: ComponentFixture<ProfileWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWalletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
