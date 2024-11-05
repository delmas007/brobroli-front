import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabProfileComponent } from './collab-profile.component';

describe('CollabProfileComponent', () => {
  let component: CollabProfileComponent;
  let fixture: ComponentFixture<CollabProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollabProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollabProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
