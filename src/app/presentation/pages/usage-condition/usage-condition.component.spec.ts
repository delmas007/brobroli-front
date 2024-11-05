import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageConditionComponent } from './usage-condition.component';

describe('UsageConditionComponent', () => {
  let component: UsageConditionComponent;
  let fixture: ComponentFixture<UsageConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageConditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsageConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
