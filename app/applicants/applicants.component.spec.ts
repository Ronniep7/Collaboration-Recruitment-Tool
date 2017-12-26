import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { applicantsComponent } from './applicants.component';

describe('applicantsComponent', () => {
  let component: applicantsComponent;
  let fixture: ComponentFixture<applicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ applicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(applicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
