import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatistictsComponent } from './profile-statisticts.component';

describe('ProfileStatistictsComponent', () => {
  let component: ProfileStatistictsComponent;
  let fixture: ComponentFixture<ProfileStatistictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStatistictsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileStatistictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
