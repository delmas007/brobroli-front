import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAddComponent } from './skills-add.component';

describe('SkillsAddComponent', () => {
  let component: SkillsAddComponent;
  let fixture: ComponentFixture<SkillsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
