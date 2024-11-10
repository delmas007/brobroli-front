import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminValidateComponent } from './admin-validate.component';

describe('AdminValidateComponent', () => {
  let component: AdminValidateComponent;
  let fixture: ComponentFixture<AdminValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminValidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
