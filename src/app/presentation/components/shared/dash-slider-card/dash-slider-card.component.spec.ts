import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSliderCardComponent } from './dash-slider-card.component';

describe('DashSliderCardComponent', () => {
  let component: DashSliderCardComponent;
  let fixture: ComponentFixture<DashSliderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashSliderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashSliderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
