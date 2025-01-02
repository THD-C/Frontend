import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserChangeTypeComponent } from './admin-user-change-type.component';

describe('AdminUserEditComponent', () => {
  let component: AdminUserChangeTypeComponent;
  let fixture: ComponentFixture<AdminUserChangeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserChangeTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserChangeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
