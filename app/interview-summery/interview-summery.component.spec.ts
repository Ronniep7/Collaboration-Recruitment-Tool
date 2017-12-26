import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewSummeryComponent } from './interview-summery.component';

describe('InterviewSummeryComponent', () => {
  let component: InterviewSummeryComponent;
  let fixture: ComponentFixture<InterviewSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
