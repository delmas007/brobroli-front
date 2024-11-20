import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPublierComponent } from './admin-publier.component';

describe('AdminPublierComponent', () => {
  let component: AdminPublierComponent;
  let fixture: ComponentFixture<AdminPublierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPublierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPublierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
