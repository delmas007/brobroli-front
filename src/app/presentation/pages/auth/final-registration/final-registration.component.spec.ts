import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalRegistrationComponent } from './final-registration.component';

describe('FinalRegistrationComponent', () => {
  let component: FinalRegistrationComponent;
  let fixture: ComponentFixture<FinalRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
